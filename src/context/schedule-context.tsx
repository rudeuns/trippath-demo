'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Schedule, TransportRoute } from '@/types/schedule';

type ScheduleContextType = {
  schedules: Schedule[];
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (schedule: Schedule) => void;
  removeSchedule: (id: number) => void;
  getSchedulesByTripId: (id: number) => Schedule[];
  addTransportRoute: (scheduleId: number, route: TransportRoute) => void;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined,
);
const STORAGE_KEY = 'trippath-demo-schedule';

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setSchedules(JSON.parse(data));
    }
  }, []);

  function syncSchedule(updatedSchedules: Schedule[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSchedules));
    setSchedules(updatedSchedules);
  }

  function addSchedule(schedule: Schedule) {
    syncSchedule([...schedules, schedule]);
  }

  function updateSchedule(updatedSchedule: Schedule) {
    const updatedSchedules = schedules.map((schedule) =>
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule,
    );
    syncSchedule(updatedSchedules);
  }

  function removeSchedule(id: number) {
    syncSchedule(schedules.filter((schedule) => schedule.id !== id));
  }

  function getSchedulesByTripId(tripId: number) {
    return schedules.filter((schedule) => schedule.tripId === tripId);
  }

  function addTransportRoute(scheduleId: number, route: TransportRoute) {
    const updatedSchedules = schedules.map((schedule) => {
      if (schedule.id !== scheduleId) return schedule;

      const currentTransport = schedule.transport ?? [];
      return {
        ...schedule,
        transport: [...currentTransport, route],
      };
    });
    syncSchedule(updatedSchedules);
  }

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        addSchedule,
        updateSchedule,
        removeSchedule,
        getSchedulesByTripId,
        addTransportRoute,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useScheduleContext() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error(
      'useScheduleContext must be used within a ScheduleProvider',
    );
  }
  return context;
}
