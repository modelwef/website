import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Users, Building2, UserCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Stats {
  totalParticipants: number;
  pendingParticipants: number;
  approvedParticipants: number;
  totalPartnerships: number;
  pendingPartnerships: number;
  totalVolunteers: number;
  pendingVolunteers: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalParticipants: 0,
    pendingParticipants: 0,
    approvedParticipants: 0,
    totalPartnerships: 0,
    pendingPartnerships: 0,
    totalVolunteers: 0,
    pendingVolunteers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch participant stats
        const { data: participants } = await supabase
          .from('participant_registrations')
          .select('status');
        
        // Fetch partnership stats
        const { data: partnerships } = await supabase
          .from('partnership_applications')
          .select('status');
        
        // Fetch volunteer stats
        const { data: volunteers } = await supabase
          .from('volunteer_signups')
          .select('status');

        setStats({
          totalParticipants: participants?.length || 0,
          pendingParticipants: participants?.filter(d => d.status === 'pending').length || 0,
          approvedParticipants: participants?.filter(d => d.status === 'approved').length || 0,
          totalPartnerships: partnerships?.length || 0,
          pendingPartnerships: partnerships?.filter(p => p.status === 'pending').length || 0,
          totalVolunteers: volunteers?.length || 0,
          pendingVolunteers: volunteers?.filter(v => v.status === 'pending').length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Participants',
      value: stats.totalParticipants,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Pending Registrations',
      value: stats.pendingParticipants,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Approved Participants',
      value: stats.approvedParticipants,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Partnership Inquiries',
      value: stats.totalPartnerships,
      icon: Building2,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Pending Partnerships',
      value: stats.pendingPartnerships,
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Volunteer Applications',
      value: stats.totalVolunteers,
      icon: UserCheck,
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Overview</h2>
        <p className="text-muted-foreground">Quick summary of all registrations and applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <p className="text-muted-foreground text-sm">
          Recent registrations and applications will appear here.
        </p>
      </div>
    </div>
  );
};

export default AdminOverview;
