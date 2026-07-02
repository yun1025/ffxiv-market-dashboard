import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'hq' | 'danger';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-gray-100 text-gray-700',
        variant === 'hq' && 'bg-amber-100 text-amber-800',
        variant === 'danger' && 'bg-red-100 text-red-700'
      )}
    >
      {children}
    </span>
  );
}