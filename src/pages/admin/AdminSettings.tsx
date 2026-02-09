import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Database } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage admin dashboard settings and preferences.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Shield size={20} />
            </div>
            <h3 className="font-semibold text-foreground">Security</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage admin access, user roles, and security settings.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Bell size={20} />
            </div>
            <h3 className="font-semibold text-foreground">Notifications</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure email notifications for new registrations and applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Database size={20} />
            </div>
            <h3 className="font-semibold text-foreground">Data Export</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Export participant data, registrations, and reports.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Settings size={20} />
            </div>
            <h3 className="font-semibold text-foreground">General</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure conference dates, registration limits, and other settings.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;
