import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, ArrowRight } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResetLink(null);

    const { data, error } = await supabase.rpc('request_delegate_password_reset', {
      _email: email,
    });

    if (error) {
      toast.error(error.message || 'Unable to send reset email.');
    } else {
      if (data) {
        setResetLink(`${window.location.origin}/reset-password?token=${data}`);
      }
      toast.success('If that email exists, a reset link has been created.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <PageHeader
        title="Forgot Password"
        subtitle="Enter your email to receive a password reset link."
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
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Reset Password</h2>

              <div className="space-y-4">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Mail size={16} className="text-accent" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="delegate@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {resetLink && (
                <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                  <p className="font-medium text-foreground">Reset link (copy/paste):</p>
                  <p className="mt-2 break-all text-foreground/80">{resetLink}</p>
                </div>
              )}

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

export default ForgotPassword;
