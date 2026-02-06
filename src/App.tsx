import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import About from "./pages/About";
import AboutConference from "./pages/AboutConference";
import AboutSecretariat from "./pages/AboutSecretariat";
import Committees from "./pages/Committees";
import CommitteeDetail from "./pages/CommitteeDetail";
import Countries from "./pages/Countries";
import Conference from "./pages/Conference";
import Resources from "./pages/Resources";
import ResourcesPolicyHandbook from "./pages/ResourcesPolicyHandbook";
import ResourcesSpeaking from "./pages/ResourcesSpeaking";
import ResourcesRules from "./pages/ResourcesRules";
import GetInvolved from "./pages/GetInvolved";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminDelegates from "./pages/admin/AdminDelegates";
import AdminPartnerships from "./pages/admin/AdminPartnerships";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminSettings from "./pages/admin/AdminSettings";

import SystemLogin from "./pages/system/SystemLogin";
import SystemDashboard from "./pages/system/SystemDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/conference" element={<AboutConference />} />
          <Route path="/about/secretariat" element={<AboutSecretariat />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/committees" element={<Committees />} />
          <Route path="/resources/committees/:id" element={<CommitteeDetail />} />
          <Route path="/resources/countries" element={<Countries />} />
          <Route path="/resources/policy-handbook" element={<ResourcesPolicyHandbook />} />
          <Route path="/resources/speaking" element={<ResourcesSpeaking />} />
          <Route path="/resources/rules" element={<ResourcesRules />} />

          {/* Legacy routes for backward compatibility */}
          <Route path="/committees" element={<Committees />} />
          <Route path="/committees/:id" element={<CommitteeDetail />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/get-involved" element={<GetInvolved />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="delegates" element={<AdminDelegates />} />
            <Route path="partnerships" element={<AdminPartnerships />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* System */}
          <Route path="/system/login" element={<SystemLogin />} />
          <Route path="/system" element={<SystemDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
