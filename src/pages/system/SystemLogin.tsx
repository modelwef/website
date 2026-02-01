import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { isSystemAccessAllowed } from '@/lib/systemAccess';
import { toast } from 'sonner';

const SystemLogin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const handleAccessCheck = async () => {
    const { data } = await supabase.auth.getSession();
    const email = data.session?.user?.email ?? null;

    if (email && isSystemAccessAllowed(email)) {
      navigate('/system');
      return;
    }

    if (email && !isSystemAccessAllowed(email)) {
      await supabase.auth.signOut();
      setUnauthorized(true);
    }

    setChecking(false);
  };

  useEffect(() => {
    handleAccessCheck();

    const { data } = supabase.auth.onAuthStateChange(() => {
      handleAccessCheck();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/system`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-xl p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-accent" size={28} />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">System Access</h1>
              <p className="text-sm text-muted-foreground">Restricted console for operations only.</p>
            </div>
          </div>

          {unauthorized && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              Your account is not authorized for system access. Please contact the MWEF team.
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 rounded-md border border-border py-3 font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="17"><g fill="none" fillRule="evenodd"><path d="M13.448 7.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11 3.11 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944" fill="#4285F4"/><path d="M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.728 6.728 0 0 0 6.01 3.703" fill="#34A853"/><path d="M3.212 8.267a4.034 4.034 0 0 1 0-2.572V3.964H.978A6.678 6.678 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017l2.234-1.731z" fill="#FABB05"/><path d="M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.728 6.728 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774" fill="#E94235"/></g></svg>
            Sign in with Google
          </button>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <LogIn size={14} />
            <span>Only approved emails can access the system console.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemLogin;
