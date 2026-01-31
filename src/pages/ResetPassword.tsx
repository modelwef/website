import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Lock, ArrowRight } from 'lucide-react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error('Missing password reset token.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.functions.invoke('password-reset', {
      body: { token, password },
    });

    if (error) {
      toast.error(error.message || 'Unable to reset password.');
    } else {
      toast.success('Password updated successfully. Please log in.');
      navigate('/login');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <PageHeader
        title="Set a New Password"
        subtitle="Choose a new password to complete your reset request."
      />

      <section className="py-20 bg-background">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-lg p-8"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">New Password</h2>

              {!token && (
                <p className="text-sm text-destructive mb-4">
                  This reset link is invalid. Please request a new one.
                </p>
              )}

              <div className="space-y-4">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock size={16} className="text-accent" />
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create a new password"
                  />
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock size={16} className="text-accent" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter your new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {loading ? 'Updating...' : (
                    <>
                      Update Password
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-accent hover:underline font-medium">
                  Back to login
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPassword;
