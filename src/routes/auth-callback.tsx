import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()
  const [msg, setMsg] = useState("Finishing sign-in…")

  useEffect(() => {
    const run = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (error) throw error
        navigate("/system", { replace: true })
      } catch (e) {
        setMsg(e instanceof Error ? e.message : "Sign-in failed.")
      }
    }

    void run()
  }, [navigate])

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <p style={{ opacity: 0.8 }}>{msg}</p>
    </main>
  )
}
