'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Trip } from '@/types/trip';

type TripContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  getTripById: (id: number) => Trip | undefined;
  removeTrip: (id: number) => void;
  updateTrip: (trip: Trip) => void;
};

const TripContext = createContext<TripContextType | undefined>(undefined);
const STORAGE_KEY = 'trippath-demo';

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setTrips(JSON.parse(data));
    }
  }, []);

  const syncAndSet = (updatedTrips: Trip[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
  };

  const addTrip = (trip: Trip) => {
    syncAndSet([...trips, trip]);
  };

  const getTripById = (id: number) => {
    return trips.find((trip) => trip.id === id);
  };

  const removeTrip = (id: number) => {
    syncAndSet(trips.filter((trip) => trip.id !== id));
  };

  const updateTrip = (updatedTrip: Trip) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip,
    );
    syncAndSet(updatedTrips);
  };

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
