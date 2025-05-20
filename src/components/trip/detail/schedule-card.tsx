'use client';

import { cn } from '@/lib/utils';
import { Schedule } from '@/types/trip';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  ClockIcon,
  EditIcon,
  DollarSignIcon,
  BookOpenIcon,
  BusIcon,
  MapPinIcon,
} from 'lucide-react';

export default function ScheduleCard({ schedule }: { schedule: Schedule }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          'ml-1 flex items-center gap-1 text-sm',
          !schedule.time && 'text-muted-foreground',
        )}
      >
        <ClockIcon className="size-3.5" />
        <span>{schedule.time ?? '미정'}</span>
      </div>

      <div className="flex flex-col gap-1 rounded-lg border pt-4 pr-2 pb-2 pl-4 shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium">{schedule.content}</p>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground mr-1 size-6"
          >
            <EditIcon />
          </Button>
        </div>

        <p className="text-muted-foreground text-sm">
          {schedule.description ?? ''}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div></div>

          <ToggleGroup type="single" size="sm">
            <ToggleGroupItem value="cost">
              <DollarSignIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="note">
              <BookOpenIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="location">
              <MapPinIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="transport">
              <BusIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
