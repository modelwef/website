import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { isSystemAccessAllowed } from '@/lib/systemAccess';
import { toast } from 'sonner';
import {
  Database,
  Flag,
  LogOut,
  RefreshCcw,
  Shield,
  Users,
  ClipboardList,
  Building2,
  UserCheck,
  Pencil,
  Check,
  X,
} from 'lucide-react';

interface DelegateRegistration {
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
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface PolicyProposal {
  id: string;
  title: string;
  description: string | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
  registration_id: string | null;
  user_id: string;
}

interface PartnershipApplication {
  id: string;
  organization_name: string;
  contact_person: string;
  email: string;
  partnership_type: string;
  status: string;
  message: string | null;
  created_at: string;
}

interface VolunteerSignup {
  id: string;
  full_name: string;
  email: string;
  preferred_role: string;
  school: string;
  status: string;
  experience: string | null;
  created_at: string;
}

const SystemDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [delegates, setDelegates] = useState<DelegateRegistration[]>([]);
  const [proposals, setProposals] = useState<PolicyProposal[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipApplication[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerSignup[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    assigned_country: '',
    status: 'pending',
  });

  const totals = useMemo(() => {
    return {
      delegates: delegates.length,
      proposals: proposals.length,
      partnerships: partnerships.length,
      volunteers: volunteers.length,
    };
  }, [delegates, proposals, partnerships, volunteers]);

  const fetchAllData = async () => {
    setLoading(true);
    const [delegatesRes, proposalsRes, partnershipRes, volunteerRes] = await Promise.all([
      supabase.from('delegate_registrations').select('*').order('created_at', { ascending: false }),
      supabase.from('policy_proposals').select('*').order('created_at', { ascending: false }),
      supabase.from('partnership_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('volunteer_signups').select('*').order('created_at', { ascending: false }),
    ]);

    if (delegatesRes.error) {
      toast.error('Failed to load delegate registrations');
    }
    if (proposalsRes.error) {
      toast.error('Failed to load policy proposals');
    }
    if (partnershipRes.error) {
      toast.error('Failed to load partnerships');
    }
    if (volunteerRes.error) {
      toast.error('Failed to load volunteer signups');
    }

    setDelegates(delegatesRes.data ?? []);
    setProposals(proposalsRes.data ?? []);
    setPartnerships(partnershipRes.data ?? []);
    setVolunteers(volunteerRes.data ?? []);
    setLoading(false);
  };

  const handleEdit = (delegate: DelegateRegistration) => {
    setEditingId(delegate.id);
    setEditForm({
      assigned_country: delegate.assigned_country ?? '',
      status: delegate.status ?? 'pending',
    });
  };

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from('delegate_registrations')
      .update({
        assigned_country: editForm.assigned_country || null,
        status: editForm.status,
      })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update delegate');
      return;
    }

    toast.success('Delegate updated');
    setEditingId(null);
    fetchAllData();
  };

  const handleAccessCheck = async () => {
    const { data } = await supabase.auth.getSession();
    const email = data.session?.user?.email ?? null;

    if (!email) {
      setAuthorized(false);
      setLoading(false);
      navigate('/system/login');
      return;
    }

    if (!isSystemAccessAllowed(email)) {
      await supabase.auth.signOut();
      setAuthorized(false);
      setUserEmail(email);
      setLoading(false);
      return;
    }

    setUserEmail(email);
    setAuthorized(true);
    fetchAllData();
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/system/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="bg-card border border-border rounded-xl p-8 max-w-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-destructive" size={26} />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Unauthorized access</h1>
              <p className="text-sm text-muted-foreground">{userEmail || 'Your account'} is not approved for system access.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Please contact the MWEF team to request access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-accent" size={24} />
            <div>
              <h1 className="text-xl font-semibold text-foreground">System Console</h1>
              <p className="text-xs text-muted-foreground">Signed in as {userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-secondary transition-colors"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Delegates', value: totals.delegates, icon: Users },
            { label: 'Policy Proposals', value: totals.proposals, icon: ClipboardList },
            { label: 'Partnerships', value: totals.partnerships, icon: Building2 },
            { label: 'Volunteers', value: totals.volunteers, icon: UserCheck },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <card.icon className="text-accent" size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-semibold text-foreground">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Database size={20} className="text-accent" />
                Delegate Registrations
              </h2>
              <p className="text-sm text-muted-foreground">All registration records with editable country allocation and status.</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium text-foreground">Delegate</th>
                    <th className="px-4 py-3 font-medium text-foreground">Delegation</th>
                    <th className="px-4 py-3 font-medium text-foreground">Preferences</th>
                    <th className="px-4 py-3 font-medium text-foreground">Assignments</th>
                    <th className="px-4 py-3 font-medium text-foreground">Status</th>
                    <th className="px-4 py-3 font-medium text-foreground">Payment</th>
                    <th className="px-4 py-3 font-medium text-foreground">Notes</th>
                    <th className="px-4 py-3 font-medium text-foreground">Created</th>
                    <th className="px-4 py-3 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {delegates.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-6 text-center text-sm text-muted-foreground">
                        No delegate registrations found.
                      </td>
                    </tr>
                  ) : (
                    delegates.map((delegate) => (
                      <tr key={delegate.id} className="hover:bg-secondary/50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">{delegate.first_name} {delegate.last_name}</p>
                          <p className="text-xs text-muted-foreground">{delegate.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="capitalize text-foreground">{delegate.delegation_type}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-foreground">
                            {delegate.delegation_type === 'country' ? delegate.preferred_country : delegate.preferred_institution}
                          </p>
                          <p className="text-xs text-muted-foreground">Committee: {delegate.committee_preference || 'Any'}</p>
                        </td>
                        <td className="px-4 py-3">
                          {editingId === delegate.id ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Flag size={16} className="text-accent" />
                                <input
                                  type="text"
                                  value={editForm.assigned_country}
                                  onChange={(event) => setEditForm({ ...editForm, assigned_country: event.target.value })}
                                  className="form-input text-sm"
                                  placeholder="Assigned country"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-foreground">Country: {delegate.assigned_country || 'Unassigned'}</p>
                              <p className="text-xs text-muted-foreground">Committee: {delegate.assigned_committee || 'Unassigned'}</p>
                              <p className="text-xs text-muted-foreground">Institution: {delegate.assigned_institution || 'N/A'}</p>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {editingId === delegate.id ? (
                            <select
                              className="form-input text-sm"
                              value={editForm.status}
                              onChange={(event) => setEditForm({ ...editForm, status: event.target.value })}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                              <option value="waitlist">Waitlist</option>
                            </select>
                          ) : (
                            <span className="text-foreground capitalize">{delegate.status}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 capitalize text-foreground">{delegate.payment_status || 'n/a'}</td>
                        <td className="px-4 py-3 text-muted-foreground">{delegate.notes || '-'}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(delegate.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {editingId === delegate.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSave(delegate.id)}
                                className="p-1 rounded-md text-accent hover:bg-accent/10"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1 rounded-md text-destructive hover:bg-destructive/10"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(delegate)}
                              className="p-1 rounded-md text-accent hover:bg-accent/10"
                            >
                              <Pencil size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="text-accent" size={20} />
              <h3 className="text-lg font-semibold text-foreground">Policy Proposals</h3>
            </div>
            <div className="space-y-4">
              {proposals.length === 0 ? (
                <p className="text-sm text-muted-foreground">No policy proposals submitted yet.</p>
              ) : (
                proposals.slice(0, 6).map((proposal) => (
                  <div key={proposal.id} className="border border-border rounded-lg p-4">
                    <p className="font-medium text-foreground">{proposal.title}</p>
                    <p className="text-xs text-muted-foreground">Status: {proposal.status}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {proposal.submitted_at ? new Date(proposal.submitted_at).toLocaleDateString() : 'Draft'}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-accent" size={20} />
              <h3 className="text-lg font-semibold text-foreground">Partnership Applications</h3>
            </div>
            <div className="space-y-4">
              {partnerships.length === 0 ? (
                <p className="text-sm text-muted-foreground">No partnership applications yet.</p>
              ) : (
                partnerships.slice(0, 6).map((partner) => (
                  <div key={partner.id} className="border border-border rounded-lg p-4">
                    <p className="font-medium text-foreground">{partner.organization_name}</p>
                    <p className="text-xs text-muted-foreground">Contact: {partner.contact_person}</p>
                    <p className="text-xs text-muted-foreground">Status: {partner.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="text-accent" size={20} />
            <h3 className="text-lg font-semibold text-foreground">Volunteer Signups</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {volunteers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No volunteer signups yet.</p>
            ) : (
              volunteers.slice(0, 6).map((volunteer) => (
                <div key={volunteer.id} className="border border-border rounded-lg p-4">
                  <p className="font-medium text-foreground">{volunteer.full_name}</p>
                  <p className="text-xs text-muted-foreground">Role: {volunteer.preferred_role}</p>
                  <p className="text-xs text-muted-foreground">Status: {volunteer.status}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SystemDashboard;
