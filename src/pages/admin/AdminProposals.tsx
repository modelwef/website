import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, FileText, Download, CheckCircle, Clock, Eye } from 'lucide-react';

interface Proposal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  status: string;
  feedback: string | null;
  submitted_at: string | null;
  created_at: string;
}

const AdminProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchProposals = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('policy_proposals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching proposals:', error);
      toast.error('Failed to fetch proposals');
    } else {
      setProposals(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('policy_proposals')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      fetchProposals();
    }
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Policy Proposals</h2>
          <p className="text-muted-foreground">Review and manage participant policy proposals for Round 1.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText size={18} />
          <span>{proposals.length} proposals</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search proposals..."
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
          <option value="submitted">Submitted</option>
          <option value="reviewed">Reviewed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No proposals found.</div>
        ) : (
          <div className="divide-y divide-border">
            {filteredProposals.map((proposal) => (
              <motion.div key={proposal.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 hover:bg-secondary/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{proposal.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                    {proposal.description && (
                      <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(proposal.created_at).toLocaleDateString()}
                      </span>
                      {proposal.file_name && (
                        <span className="flex items-center gap-1">
                          <FileText size={12} />
                          {proposal.file_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {proposal.file_url && (
                      <button className="p-2 text-accent hover:bg-accent/10 rounded" title="Download">
                        <Download size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => updateStatus(proposal.id, 'reviewed')}
                      className="p-2 text-green-600 hover:bg-green-100 rounded"
                      title="Mark as Reviewed"
                    >
                      <CheckCircle size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProposals;
