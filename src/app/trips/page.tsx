'use client';

import { useState } from 'react';
import { useTripContext } from '@/context/trip-context';
import TripTopbar from '@/components/trip/list/trip-topbar';
import TripFilter from '@/components/trip/list/trip-filter';
import TripCard from '@/components/trip/list/trip-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

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
    <div className="flex flex-grow flex-col">
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

      <section className="flex flex-grow flex-col gap-4 px-2 py-4">
        {trips.length === 0 ? (
          <p className="text-muted-foreground text-center">
            아직 생성된 여행이 없습니다.
          </p>
        ) : filteredTrips.length === 0 ? (
          <p className="text-muted-foreground text-center">
            검색 결과가 없습니다.
          </p>
        ) : (
          <>
            {sortedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </>
        )}
      </section>

      <div className="px-2 py-4">
        <Alert className="bg-muted">
          <AlertCircleIcon />
          <AlertTitle>데모 버전</AlertTitle>
          <AlertDescription>
            로그인 없이 기능 체험이 가능합니다.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
