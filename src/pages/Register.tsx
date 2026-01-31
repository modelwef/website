import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, School, Globe, BookOpen, CreditCard, CheckCircle, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { committees } from '@/data/committees';
import { allCountries, institutions } from '@/data/countries';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    grade: '',
    delegationType: 'country',
    preferredCountry: '',
    preferredInstitution: '',
    committeePreference: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const splitName = (fullName: string) => {
    const trimmed = fullName.trim();
    if (!trimmed) {
      return { firstName: '', lastName: '' };
    }
    const [firstName, ...rest] = trimmed.split(/\s+/);
    return {
      firstName,
      lastName: rest.join(' '),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const { firstName, lastName } = splitName(formData.fullName);
    const notes = [
      `School: ${formData.school}`,
      `Grade: ${formData.grade}`,
    ].join('\n');
    const { error: regError } = await supabase.rpc('register_delegate', {
      _first_name: firstName,
      _last_name: lastName,
      _email: formData.email,
      _password: formData.password,
      _delegation_type: formData.delegationType,
      _preferred_country: formData.delegationType === 'country' ? formData.preferredCountry : null,
      _preferred_institution: formData.delegationType === 'institution' ? formData.preferredInstitution : null,
      _committee_preference: formData.committeePreference || null,
      _notes: notes,
    });

    if (regError) {
      console.error('Registration error:', regError);
      toast.error('Registration failed. Please try again or contact support.');
    } else {
      toast.success('Registration submitted successfully! We will email you with next steps.');
    }

    setLoading(false);
    navigate('/login');
  };

  return (
    <Layout>
      <PageHeader
        title="Register for MWEF"
        subtitle="Join Dubai's premier economics competition and develop real-world policy-making skills."
      />

      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-lg p-6 md:p-8"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Delegate Registration</h2>

                {/* Personal Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="text-accent" size={20} />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="delegate@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="form-label flex items-center gap-2">
                        <Lock size={16} className="text-accent" />
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-input pr-12"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          placeholder="Create a password"
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
                    <div>
                      <label className="form-label flex items-center gap-2">
                        <Lock size={16} className="text-accent" />
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-input pr-12"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                          placeholder="Re-enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* School Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <School className="text-accent" size={20} />
                    School Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">School Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        required
                        placeholder="Your school name"
                      />
                    </div>
                    <div>
                      <label className="form-label">Grade/Year *</label>
                      <select
                        className="form-input"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        required
                      >
                        <option value="">Select grade</option>
                        {[7, 8, 9, 10, 11, 12].map((grade) => (
                          <option key={grade} value={`Year ${grade}`}>Year {grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Delegation Preferences */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="text-accent" size={20} />
                    Delegation Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Delegation Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="delegationType"
                            value="country"
                            checked={formData.delegationType === 'country'}
                            onChange={(e) => setFormData({ ...formData, delegationType: e.target.value })}
                            className="text-accent"
                          />
                          <span className="text-foreground">Country</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="delegationType"
                            value="institution"
                            checked={formData.delegationType === 'institution'}
                            onChange={(e) => setFormData({ ...formData, delegationType: e.target.value })}
                            className="text-accent"
                          />
                          <span className="text-foreground">Institution</span>
                        </label>
                      </div>
                    </div>

                    {formData.delegationType === 'country' ? (
                      <div>
                        <label className="form-label">Preferred Country</label>
                        <select
                          className="form-input"
                          value={formData.preferredCountry}
                          onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                        >
                          <option value="">Select country preference</option>
                          {allCountries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="form-label">Preferred Institution</label>
                        <select
                          className="form-input"
                          value={formData.preferredInstitution}
                          onChange={(e) => setFormData({ ...formData, preferredInstitution: e.target.value })}
                        >
                          <option value="">Select institution preference</option>
                          {institutions.map((inst) => (
                            <option key={inst.abbreviation} value={inst.abbreviation}>
                              {inst.name} ({inst.abbreviation})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Committee Preference */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="text-accent" size={20} />
                    Committee Preference
                  </h3>
                  <div>
                    <label className="form-label">Preferred Committee</label>
                    <select
                      className="form-input"
                      value={formData.committeePreference}
                      onChange={(e) => setFormData({ ...formData, committeePreference: e.target.value })}
                    >
                      <option value="">Select committee preference</option>
                      {committees.map((committee) => (
                        <option key={committee.id} value={committee.abbreviation}>
                          {committee.name} ({committee.abbreviation}) - {committee.categoryShort}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-8">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the MWEF Code of Conduct and understand that my registration is subject to availability and final approval by the organizing committee.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      Submit Registration
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Registration Fee */}
              <div
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="text-accent" size={24} />
                  <h3 className="text-xl font-semibold text-foreground">Registration Fee</h3>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">AED 30</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Payment will be collected after registration approval.
                </p>
                <div className="text-xs text-muted-foreground border-t border-border pt-4">
                  Fee includes conference materials, refreshments, and certificate of participation.
                </div>
              </div>

              {/* What's Included */}
              <div
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    'Full conference access',
                    'Committee participation',
                    'Conference materials',
                    'Refreshments',
                    'Certificate of participation',
                    'Award eligibility',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="text-accent flex-shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Dates */}
              <div
                className="bg-primary text-white rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Important Dates</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-white/70">Conference Date</span>
                    <span className="font-medium">21 Feb 2026</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Registration Deadline</span>
                    <span className="font-medium">TBA</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Assignment Release</span>
                    <span className="font-medium">TBA</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
