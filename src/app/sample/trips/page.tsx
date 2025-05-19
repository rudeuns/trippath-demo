'use client';

import { useState } from 'react';
import { useTripContext } from '@/context/trip-context';
import TripTopbar from '@/components/trip/list/trip-topbar';
import TripFilter from '@/components/trip/list/trip-filter';
import TripCard from '@/components/trip/list/trip-card';

export default function TripListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { trips } = useTripContext();

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      case 'oldest':
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col">
      <header className="bg-background sticky top-0 z-10 flex flex-col gap-4 border-b p-2 pt-4">
        <TripTopbar />
        <TripFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          tripCount={filteredTrips.length}
        />
      </header>

      {filteredTrips.length === 0 ? (
        <div className="text-muted-foreground flex justify-center py-5">
          {trips.length === 0
            ? '아직 생성된 여행이 없습니다.'
            : '검색 결과가 없습니다.'}
        </div>
      ) : (
        <section className="flex flex-col gap-4 px-2 pt-4 pb-10">
          {sortedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </section>
      )}
    </div>
  );
}
