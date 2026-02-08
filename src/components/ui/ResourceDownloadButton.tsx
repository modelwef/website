import { Download } from 'lucide-react';

import { useResourceAvailability } from '@/hooks/useResourceAvailability';

interface ResourceDownloadButtonProps {
  url?: string | null;
  label?: string;
  variant?: 'default' | 'primary' | 'outline';
  className?: string;
}

export const ResourceDownloadButton = ({
  url,
  label = 'PDF',
  variant = 'default',
  className = '',
}: ResourceDownloadButtonProps) => {
  const isAvailable = useResourceAvailability(url);

  if (!url || !isAvailable) {
    return null;
  }

  const variantClasses = {
    default:
      'flex-shrink-0 px-4 py-2 border border-border rounded-md text-sm font-medium text-muted-foreground hover:border-accent hover:text-accent transition-colors',
    primary: 'btn-primary flex items-center gap-2',
    outline: 'btn-outline flex items-center gap-2',
  };

  return (
    <a
      href={url}
      className={`${variantClasses[variant]} ${className}`}
      target="_blank"
      rel="noreferrer"
    >
      <Download size={16} className="inline mr-1" />
      {label}
    </a>
  );
};
