import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

import { ResourceDownloadButton } from '@/components/ui/ResourceDownloadButton';

interface ResourceCardProps {
  title: string;
  description: string;
  index: number;
  url?: string;
}

export const ResourceCard = ({ title, description, index, url }: ResourceCardProps) => {
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
      <ResourceDownloadButton url={url} />
    </motion.div>
  );
};
