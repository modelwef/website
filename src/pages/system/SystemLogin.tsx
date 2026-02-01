import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chrome, Shield, LogIn } from 'lucide-react';
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
            <Chrome size={20} className="text-accent" />
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
