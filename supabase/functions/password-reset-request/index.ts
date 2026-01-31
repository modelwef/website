import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const generateToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = btoa(String.fromCharCode(...bytes));
  return token.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const hashToken = async (token: string) => {
  const data = new TextEncoder().encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const { email } = await req.json();

  if (!email) {
    return jsonResponse({ error: "Email is required." }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const resendFrom = Deno.env.get("RESEND_FROM");
  const frontendUrl = Deno.env.get("FRONTEND_URL");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Missing Supabase configuration." }, 500);
  }

  if (!resendKey || !resendFrom) {
    return jsonResponse({ error: "Missing Resend configuration." }, 500);
  }

  if (!frontendUrl) {
    return jsonResponse({ error: "Missing FRONTEND_URL configuration." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: delegate } = await supabase
    .from("delegate_registrations")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (!delegate) {
    return jsonResponse({ success: true });
  }

  const token = generateToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  const { error: insertError } = await supabase
    .from("delegate_password_resets")
    .insert({
      email,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

  if (insertError) {
    return jsonResponse({ error: insertError.message }, 500);
  }

  const resetLink = `${frontendUrl.replace(/\\/$/, "")}/reset-password?token=${token}`;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: email,
      subject: "Reset your MWEF password",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your MWEF password. Click the link below to continue:</p>
        <p><a href="${resetLink}">Reset your password</a></p>
        <p>This link expires in 30 minutes.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    }),
  });

  if (!emailResponse.ok) {
    const errorBody = await emailResponse.text();
    return jsonResponse({ error: errorBody }, 500);
  }

  return jsonResponse({ success: true });
});
