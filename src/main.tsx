import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"

import SystemPage from "./routes/system"
import AuthCallback from "./routes/auth-callback"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/system" element={<SystemPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  </BrowserRouter>
)
