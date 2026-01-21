import { motion } from 'framer-motion';
import { Users, Award, Calendar, Building } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '250+',
    label: 'Expected Delegates',
  },
  {
    icon: Award,
    value: '8',
    label: 'Committees',
  },
  {
    icon: Calendar,
    value: '21st Feb',
    label: '2026',
  },
  {
    icon: Building,
    value: '20+',
    label: 'Schools',
  },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <stat.icon className="text-primary" size={28} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
