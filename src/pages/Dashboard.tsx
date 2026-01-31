import { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { User, FileText, Globe, Calendar, LogOut, Edit, Upload, Send, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Registration {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  delegation_type: string;
  preferred_country: string | null;
  preferred_institution: string | null;
  committee_preference: string | null;
  assigned_country: string | null;
  assigned_institution: string | null;
  assigned_committee: string | null;
  status: string;
  payment_status: string;
  created_at: string;
  notes: string | null;
}

interface PolicyProposal {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  status: string;
  feedback: string | null;
  submitted_at: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [proposals, setProposals] = useState<PolicyProposal[]>([]);
  const [loadingReg, setLoadingReg] = useState(true);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { schoolName, gradeLevel } = useMemo(() => {
    if (!registration?.notes) {
      return { schoolName: 'Not set', gradeLevel: 'Not set' };
    }

    const lines = registration.notes.split('\n');
    const schoolLine = lines.find((line) => line.startsWith('School:'));
    const gradeLine = lines.find((line) => line.startsWith('Grade:'));
    return {
      schoolName: schoolLine?.replace('School:', '').trim() || 'Not set',
      gradeLevel: gradeLine?.replace('Grade:', '').trim() || 'Not set',
    };
  }, [registration]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const registrationEmail = user.email;
      if (!registrationEmail) {
        setLoadingReg(false);
        return;
      }
      
      // Fetch registration
      const { data: regData, error: regError } = await supabase
        .from('delegate_registrations')
        .select('*')
        .eq('email', registrationEmail)
        .maybeSingle();

      if (regError) {
        console.error('Error fetching registration:', regError);
      } else {
        setRegistration(regData);
      }

      // Fetch proposals
      const { data: proposalData, error: proposalError } = await supabase
        .from('policy_proposals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (proposalError) {
        console.error('Error fetching proposals:', proposalError);
      } else {
        setProposals(proposalData || []);
      }

      setLoadingReg(false);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setProposalFile(file);
    }
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !registration) return;

    if (!proposalTitle.trim()) {
      toast.error('Please enter a proposal title');
      return;
    }

    setUploading(true);
    let fileUrl = null;
    let fileName = null;

    // Upload file if selected
    if (proposalFile) {
      const fileExt = proposalFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('policy-proposals')
        .upload(filePath, proposalFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Failed to upload file');
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('policy-proposals')
        .getPublicUrl(filePath);

      fileUrl = filePath;
      fileName = proposalFile.name;
    }

    // Create proposal
    const { error } = await supabase
      .from('policy_proposals')
      .insert({
        user_id: user.id,
        registration_id: registration.id,
        title: proposalTitle,
        description: proposalDescription || null,
        file_url: fileUrl,
        file_name: fileName,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Proposal error:', error);
      toast.error('Failed to submit proposal');
    } else {
      toast.success('Policy proposal submitted successfully!');
      setShowProposalForm(false);
      setProposalTitle('');
      setProposalDescription('');
      setProposalFile(null);
      
      // Refresh proposals
      const { data } = await supabase
        .from('policy_proposals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setProposals(data || []);
    }

    setUploading(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reviewed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getProposalStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="text-blue-600" size={16} />;
      case 'reviewed': return <CheckCircle className="text-green-600" size={16} />;
      case 'draft': return <Edit className="text-muted-foreground" size={16} />;
      default: return <AlertCircle className="text-yellow-600" size={16} />;
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Delegate Dashboard"
        subtitle={`Welcome back, ${user ? `${user.first_name} ${user.last_name}`.trim() : 'Delegate'}!`}
      />

      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <User className="text-accent" size={20} />
                    Profile Information
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">
                      {user ? `${user.first_name} ${user.last_name}`.trim() : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user?.email || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">School</p>
                    <p className="font-medium text-foreground">{schoolName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-medium text-foreground">{gradeLevel}</p>
                  </div>
                </div>
              </motion.div>

              {/* Registration Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <FileText className="text-accent" size={20} />
                    Registration Status
                  </h2>
                </div>

                {loadingReg ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ) : registration ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(registration.status)}`}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Delegation Type</p>
                        <p className="font-medium text-foreground capitalize">{registration.delegation_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Preferred {registration.delegation_type === 'country' ? 'Country' : 'Institution'}</p>
                        <p className="font-medium text-foreground">
                          {registration.delegation_type === 'country' 
                            ? registration.preferred_country 
                            : registration.preferred_institution || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Committee Preference</p>
                        <p className="font-medium text-foreground">{registration.committee_preference || 'Any'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Status</p>
                        <p className="font-medium text-foreground capitalize">{registration.payment_status}</p>
                      </div>
                    </div>

                    {(registration.assigned_country || registration.assigned_committee) && (
                      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Globe className="text-accent" size={18} />
                          Your Assignment
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned {registration.delegation_type === 'country' ? 'Country' : 'Institution'}</p>
                            <p className="font-bold text-primary">
                              {registration.delegation_type === 'country' 
                                ? registration.assigned_country 
                                : registration.assigned_institution || 'Pending'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned Committee</p>
                            <p className="font-bold text-primary">{registration.assigned_committee || 'Pending'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
                    <p className="text-muted-foreground mb-4">You haven't registered yet.</p>
                    <Link to="/register" className="btn-primary inline-block">
                      Register Now
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Policy Proposal Section */}
              {registration && registration.status === 'approved' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-lg p-6"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <Upload className="text-accent" size={20} />
                      Round 1: Policy Proposal
                    </h2>
                    <button
                      onClick={() => setShowProposalForm(true)}
                      className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                    >
                      <Send size={16} />
                      Submit Proposal
                    </button>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Submit your policy proposal document for Round 1. You can submit multiple versions, but only the latest will be considered.
                  </p>

                  {/* Proposal Form Modal */}
                  {showProposalForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-lg p-6 w-full max-w-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-foreground">Submit Policy Proposal</h3>
                          <button onClick={() => setShowProposalForm(false)} className="text-muted-foreground hover:text-foreground">
                            <X size={20} />
                          </button>
                        </div>
                        
                        <form onSubmit={handleSubmitProposal} className="space-y-4">
                          <div>
                            <label className="form-label">Proposal Title *</label>
                            <input
                              type="text"
                              className="form-input"
                              value={proposalTitle}
                              onChange={(e) => setProposalTitle(e.target.value)}
                              placeholder="e.g., Economic Policy for Sustainable Development"
                              required
                            />
                          </div>
                          <div>
                            <label className="form-label">Description (Optional)</label>
                            <textarea
                              className="form-input min-h-[100px]"
                              value={proposalDescription}
                              onChange={(e) => setProposalDescription(e.target.value)}
                              placeholder="Brief overview of your proposal..."
                            />
                          </div>
                          <div>
                            <label className="form-label">Upload Document (Optional)</label>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors"
                            >
                              {proposalFile ? (
                                <div className="flex items-center justify-center gap-2">
                                  <FileText className="text-accent" size={20} />
                                  <span className="text-foreground">{proposalFile.name}</span>
                                </div>
                              ) : (
                                <div>
                                  <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                                  <p className="text-muted-foreground text-sm">Click to upload PDF or Word document</p>
                                  <p className="text-muted-foreground text-xs mt-1">Max 10MB</p>
                                </div>
                              )}
                            </button>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <button
                              type="button"
                              onClick={() => setShowProposalForm(false)}
                              className="flex-1 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={uploading}
                              className="flex-1 btn-primary py-2"
                            >
                              {uploading ? 'Submitting...' : 'Submit Proposal'}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}

                  {/* Previous Submissions */}
                  {proposals.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Your Submissions</h4>
                      {proposals.map((proposal) => (
                        <div key={proposal.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getProposalStatusIcon(proposal.status)}
                            <div>
                              <p className="font-medium text-foreground">{proposal.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Submitted {new Date(proposal.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                            {proposal.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary/30 rounded-lg">
                      <FileText className="mx-auto text-muted-foreground mb-3" size={40} />
                      <p className="text-muted-foreground">No proposals submitted yet</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    to="/resources"
                    className="block w-full text-left px-4 py-3 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    📚 View Resources
                  </Link>
                  <Link
                    to="/resources/committees"
                    className="block w-full text-left px-4 py-3 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    🏛️ Explore Committees
                  </Link>
                  <Link
                    to="/about/conference"
                    className="block w-full text-left px-4 py-3 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    📋 Conference Structure
                  </Link>
                </div>
              </motion.div>

              {/* Important Dates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary text-primary-foreground rounded-lg p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={18} />
                  Important Dates
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-white/70">Conference</span>
                    <span className="font-medium">21 Feb 2026</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Reg. Deadline</span>
                    <span className="font-medium">TBA</span>
                  </li>
                </ul>
              </motion.div>


              {/* Sign Out */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
