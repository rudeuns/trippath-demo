export interface Schedule {
  id: number;
  tripId: number;
  date: string;
  content: string;
  time?: string;
  address?: string;
  description?: string;
}
