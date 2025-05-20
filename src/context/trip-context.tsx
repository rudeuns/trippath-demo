'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Trip } from '@/types/trip';

type TripContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  removeTrip: (id: number) => void;
  getTripById: (id: number) => Trip | undefined;
};

const TripContext = createContext<TripContextType | undefined>(undefined);
const STORAGE_KEY = 'trippath-demo-trip';

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setTrips(JSON.parse(data));
    }
  }, []);

  function syncTrip(updatedTrips: Trip[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
  }

  function addTrip(trip: Trip) {
    syncTrip([...trips, trip]);
  }

  function updateTrip(updatedTrip: Trip) {
    const updatedTrips = trips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip,
    );
    syncTrip(updatedTrips);
  }

  function removeTrip(id: number) {
    syncTrip(trips.filter((trip) => trip.id !== id));
  }

  function getTripById(id: number) {
    return trips.find((trip) => trip.id === id);
  }

  return (
    <TripContext.Provider
      value={{ trips, addTrip, getTripById, removeTrip, updateTrip }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTripContext() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
}
