export interface Trip {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export interface Schedule {
  id: number;
  tripId: number;
  date: string;
  content: string;
  time?: string;
  address?: string;
  description?: string;
}
