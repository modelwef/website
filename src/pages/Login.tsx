import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <PageHeader
        title="Delegate Login"
        subtitle="Access your MWEF delegate dashboard and manage your registration."
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
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Sign In</h2>

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

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock size={16} className="text-accent" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {loading ? 'Signing in...' : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-accent hover:underline font-medium">
                    Register now
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
