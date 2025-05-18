import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { CompassIcon } from 'lucide-react';

const logoVariants = cva('flex items-center gap-2', {
  variants: {
    size: {
      sm: 'text-sm font-medium',
      md: 'text-lg font-semibold',
      lg: 'text-2xl font-semibold',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function Logo({
  className,
  size,
}: React.ComponentProps<'div'> & VariantProps<typeof logoVariants>) {
  const iconSize = {
    sm: 'size-5',
    md: 'size-6',
    lg: 'size-7',
  }[size ?? 'md'];

  return (
    <div className={logoVariants({ size, className })}>
      <CompassIcon className={cn(iconSize)} />
      <span>TripPath</span>
    </div>
  );
}
