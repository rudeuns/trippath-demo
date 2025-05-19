'use client';

import { use } from 'react';
import { useTripContext } from '@/context/trip-context';
import { format, differenceInCalendarDays, addDays } from 'date-fns';
import TripHeader from '@/components/trip/detail/trip-header';
import DateSection from '@/components/trip/detail/date-section';

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = use(params);
  const { getTripById } = useTripContext();
  const trip = getTripById(Number(id));

  if (!trip) return null;

  function getDateRange(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dayCount = differenceInCalendarDays(endDate, startDate) + 1;

    return Array.from({ length: dayCount }).map((_, i) =>
      format(addDays(startDate, i), 'yyyy-MM-dd'),
    );
  }

  return (
    <div className="flex flex-grow flex-col">
      <TripHeader trip={trip} />

      <section className="flex flex-col gap-4 p-2 pt-4">
        {getDateRange(trip.startDate, trip.endDate).map((date, index) => (
          <DateSection key={index} index={index + 1} date={date} />
        ))}
      </section>
    </div>
  );
}
