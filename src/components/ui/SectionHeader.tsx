import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  center?: boolean;
  light?: boolean;
}

export const SectionHeader = ({ title, subtitle, children, center = false, light = false }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      <div className={`accent-bar mb-4 ${center ? 'mx-auto' : ''}`} />
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-3xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
};
