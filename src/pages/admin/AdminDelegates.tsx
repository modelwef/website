import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Filter, Edit, Check, X, Users } from 'lucide-react';
import { committees } from '@/data/committees';
import { allCountries, institutions } from '@/data/countries';

interface Delegate {
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
  payment_status: string | null;
  notes: string | null;
  created_at: string;
}

const AdminDelegates = () => {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    assigned_country: '',
    assigned_institution: '',
    assigned_committee: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected' | 'waitlist',
    payment_status: '',
  });

  const fetchDelegates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('delegate_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching delegates:', error);
      toast.error('Failed to fetch delegates');
    } else {
      setDelegates(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDelegates();
  }, []);

  const handleEdit = (delegate: Delegate) => {
    setEditingId(delegate.id);
    setEditForm({
      assigned_country: delegate.assigned_country || '',
      assigned_institution: delegate.assigned_institution || '',
      assigned_committee: delegate.assigned_committee || '',
      status: delegate.status as 'pending' | 'approved' | 'rejected' | 'waitlist',
      payment_status: delegate.payment_status || '',
    });
  };

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from('delegate_registrations')
      .update({
        assigned_country: editForm.assigned_country || null,
        assigned_institution: editForm.assigned_institution || null,
        assigned_committee: editForm.assigned_committee || null,
        status: editForm.status,
        payment_status: editForm.payment_status || null,
      })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update delegate');
    } else {
      toast.success('Delegate updated successfully');
      setEditingId(null);
      fetchDelegates();
    }
  };

  const filteredDelegates = delegates.filter(delegate => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const delegateName = `${delegate.first_name} ${delegate.last_name}`.trim().toLowerCase();
    const matchesSearch = !normalizedSearch
      || delegate.email.toLowerCase().includes(normalizedSearch)
      || delegateName.includes(normalizedSearch);
    const matchesStatus = statusFilter === 'all' || delegate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-accent/20 text-accent';
      case 'pending': return 'bg-accent/10 text-foreground';
      case 'rejected': return 'bg-destructive/20 text-destructive';
      case 'waitlist': return 'bg-primary/20 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Delegate Registrations</h2>
          <p className="text-muted-foreground">Manage and assign delegations to registered delegates.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={18} />
          <span>{delegates.length} total delegates</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="form-input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
          </div>
        ) : filteredDelegates.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No delegates found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Delegate</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Preference</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Assignment</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDelegates.map((delegate) => (
                  <motion.tr key={delegate.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-secondary/50">
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <p className="text-foreground">{delegate.first_name} {delegate.last_name}</p>
                        <p className="text-muted-foreground">{delegate.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <p className="text-foreground capitalize">{delegate.delegation_type}</p>
                        <p className="text-muted-foreground">
                          {delegate.delegation_type === 'country' ? delegate.preferred_country : delegate.preferred_institution || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {editingId === delegate.id ? (
                        <div className="space-y-2">
                          <select className="form-input text-sm py-1" value={editForm.assigned_committee} onChange={(e) => setEditForm({ ...editForm, assigned_committee: e.target.value })}>
                            <option value="">Select Committee</option>
                            {committees.map(c => <option key={c.id} value={c.abbreviation}>{c.abbreviation}</option>)}
                          </select>
                          <select className="form-input text-sm py-1" value={editForm.assigned_country} onChange={(e) => setEditForm({ ...editForm, assigned_country: e.target.value })}>
                            <option value="">Select Country</option>
                            {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      ) : (
                        <div className="text-sm">
                          <p className="text-foreground">{delegate.assigned_committee || '-'}</p>
                          <p className="text-muted-foreground">{delegate.assigned_country || delegate.assigned_institution || '-'}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === delegate.id ? (
                        <select className="form-input text-sm py-1" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="waitlist">Waitlist</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delegate.status)}`}>{delegate.status}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === delegate.id ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleSave(delegate.id)} className="p-1 text-accent hover:bg-accent/10 rounded"><Check size={18} /></button>
                          <button onClick={() => setEditingId(null)} className="p-1 text-destructive hover:bg-destructive/10 rounded"><X size={18} /></button>
                        </div>
                      ) : (
                        <button onClick={() => handleEdit(delegate)} className="p-1 text-accent hover:bg-accent/10 rounded"><Edit size={18} /></button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDelegates;
