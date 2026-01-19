import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CommitteeCardProps {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  description: string;
  index: number;
}

export const CommitteeCard = ({ id, name, abbreviation, category, description, index }: CommitteeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/committees/${id}`} className="block committee-card h-full group">
        <div className="flex items-start justify-between mb-4">
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
            {category}
          </span>
          <span className="text-primary font-bold text-lg">{abbreviation}</span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
          <span>Learn More</span>
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};
