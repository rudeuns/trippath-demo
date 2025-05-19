'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface DateSectionProps {
  index: number;
  date: string;
}

export default function DateSection({ index, date }: DateSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border shadow-xs">
      <button
        className="bg-muted/40 flex w-full items-center justify-between p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium">
          Day{String(index).padStart(2, ' ')} ({date})
        </span>

        {isExpanded ? (
          <ChevronDownIcon className="text-muted-foreground size-5" />
        ) : (
          <ChevronRightIcon className="text-muted-foreground size-5" />
        )}
      </button>

      <div
        className={cn('transition-all', isExpanded ? 'block' : 'hidden')}
      ></div>
    </div>
  );
}
