import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  index: number;
}

export const ResourceCard = ({ title, description, index }: ResourceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="resource-card group"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
        <FileText className="text-accent" size={24} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        className="flex-shrink-0 px-4 py-2 border border-border rounded-md text-sm font-medium text-muted-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        <Download size={16} className="inline mr-1" />
        PDF
      </button>
    </motion.div>
  );
};
