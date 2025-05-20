'use client';

import { use } from 'react';
import { useTripContext } from '@/context/trip-context';
import { useScheduleContext } from '@/context/schedule-context';
import { format, differenceInCalendarDays, addDays } from 'date-fns';
import TripHeader from '@/components/trip/detail/trip-header';
import DateSection from '@/components/trip/detail/date-section';
import NewScheduleForm from '@/components/trip/detail/new-schedule-form';

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = use(params);
  const { getTripById } = useTripContext();
  const { getSchedulesByTripId } = useScheduleContext();

  const tripId = Number(id);
  const trip = getTripById(tripId);
  const schedules = getSchedulesByTripId(tripId);

  if (!trip) return null;

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const dates = Array.from({
    length: differenceInCalendarDays(endDate, startDate) + 1,
  }).map((_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'));

  return (
    <div className="flex flex-grow flex-col">
      <TripHeader trip={trip} />

      <section className="flex flex-grow flex-col gap-4 p-2 pt-4">
        {dates.map((date, index) => {
          const filteredSchedules = schedules.filter(
            (schedule) => schedule.date === date,
          );
          return (
            <DateSection
              key={index}
              index={index + 1}
              date={date}
              schedules={filteredSchedules}
            />
          );
        })}
      </section>

      <div className="bg-background sticky bottom-0 z-10 px-2 py-4">
        <NewScheduleForm tripId={tripId} dates={dates} />
      </div>
    </div>
  );
}
