import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabase"

type GateStatus = "loading" | "signed_out" | "denied" | "allowed"

export default function SystemPage() {
  const [gate, setGate] = useState<GateStatus>("loading")
  const [email, setEmail] = useState<string | null>(null)

  const origin = useMemo(() => window.location.origin, [])

  const checkGate = async () => {
    const { data } = await supabase.auth.getSession()
    const session = data.session

    if (!session) {
      setGate("signed_out")
      setEmail(null)
      return
    }

    const userEmail = session.user.email?.toLowerCase() ?? null
    setEmail(userEmail)

    // This relies on your SQL function public.is_system_admin()
    const { data: isAdmin, error } = await supabase.rpc("is_system_admin")

    if (error) {
      await supabase.auth.signOut()
      setGate("signed_out")
      setEmail(null)
      return
    }

    if (!isAdmin) {
      await supabase.auth.signOut()
      setGate("denied")
      return
    }

    setGate("allowed")
  }

  useEffect(() => {
    void checkGate()

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void checkGate()
    })

    return () => {
      sub.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setGate("signed_out")
    setEmail(null)
  }

  if (gate === "loading") {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <p style={{ opacity: 0.8 }}>Loading…</p>
      </main>
    )
  }

  if (gate === "signed_out") {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <button onClick={signIn} style={{ padding: 12, borderRadius: 10 }}>
          Sign in with Google
        </button>
      </main>
    )
  }

  if (gate === "denied") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 520, padding: 24, border: "1px solid #fca5a5", borderRadius: 16 }}>
          <h1 style={{ margin: 0, color: "#dc2626" }}>Access denied</h1>
          <p style={{ opacity: 0.8 }}>
            This Google account is not authorized to access this system.
          </p>
          {email ? (
            <p style={{ fontSize: 12, opacity: 0.75 }}>
              Signed in as <span style={{ fontFamily: "monospace" }}>{email}</span>
            </p>
          ) : null}
          <div style={{ marginTop: 16 }}>
            <button onClick={signIn} style={{ padding: 12, borderRadius: 10 }}>
              Try a different Google account
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ✅ Allowed (replace with your real console UI)
  return (
    <main style={{ minHeight: "100vh", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>System Console</h1>
        <button onClick={signOut} style={{ padding: 10, borderRadius: 10 }}>
          Sign out
        </button>
      </div>

      <p style={{ opacity: 0.8 }}>
        Signed in as <span style={{ fontFamily: "monospace" }}>{email}</span>
      </p>

      <hr style={{ margin: "18px 0" }} />

      <div style={{ opacity: 0.85 }}>
        Put your admin UI here (upload / manage delegates / etc).
      </div>
    </main>
  )
}
