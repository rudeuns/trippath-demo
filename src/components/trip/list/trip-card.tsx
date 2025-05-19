'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Trip } from '@/types/trip';
import { Card, CardContent } from '@/components/ui/card';
import { MapPinIcon, CalendarDaysIcon, ChevronRightIcon } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/trips/${trip.id}`);
  }

  return (
    <Card className="cursor-pointer py-4" onClick={handleClick}>
      <CardContent className="flex items-center justify-between gap-2 px-4">
        <div className="flex flex-col gap-1">
          <h2 className="truncate pb-1 font-semibold">{trip.title}</h2>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <MapPinIcon className="size-3.5 flex-none" />
            <span className="truncate">{trip.destination}</span>
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <CalendarDaysIcon className="size-3.5 flex-none" />
            <span>
              {format(trip.startDate, 'yyyy.MM.dd')} ~{' '}
              {format(trip.endDate, 'yyyy.MM.dd')}
            </span>
          </div>
        </div>

        <ChevronRightIcon className="text-muted-foreground size-5 flex-none" />
      </CardContent>
    </Card>
  );
}
