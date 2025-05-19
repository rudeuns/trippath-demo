'use client';

import { use } from 'react';
import { useTripContext } from '@/context/trip-context';
import TripHeader from '@/components/trip/detail/trip-header';

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = use(params);
  const { getTripById } = useTripContext();
  const trip = getTripById(Number(id));

  if (!trip) return null;

  return (
    <div className="flex flex-grow flex-col">
      <TripHeader trip={trip} />
    </div>
  );
}
