import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image?: string;
  index: number;
}

export const TeamMemberCard = ({ name, role, image, index }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card border border-border rounded-lg p-6 text-center group hover:border-accent/30 transition-all duration-300"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground/30">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
      <h4 className="font-semibold text-foreground text-lg mb-1">{name}</h4>
      <p className="text-muted-foreground text-sm">{role}</p>
    </motion.div>
  );
};
