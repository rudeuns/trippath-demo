'use client';

import { useState } from 'react';
import { Schedule } from '@/types/schedule';
import ScheduleCard from '@/components/trip/detail/schedule-card';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface DateSectionProps {
  index: number;
  date: string;
  schedules: Schedule[];
}

export default function DateSection({
  index,
  date,
  schedules,
}: DateSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedSchedules = [...schedules].sort((a, b) => {
    const aHasTime = !!a.time;
    const bHasTime = !!b.time;

    if (aHasTime && bHasTime) {
      return a.time!.localeCompare(b.time!);
    }

    if (aHasTime) return -1;
    if (bHasTime) return 1;
    return 0;
  });

  return (
    <div className="rounded-lg border shadow-xs">
      <button
        className="bg-muted/50 flex w-full cursor-pointer items-center justify-between p-4"
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

      {isExpanded && (
        <div className="flex flex-col gap-4 p-3">
          {sortedSchedules.map((schedule, i) => (
            <ScheduleCard key={i} schedule={schedule} />
          ))}
        </div>
      )}
    </div>
  );
}
