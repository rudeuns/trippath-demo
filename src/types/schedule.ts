export interface Schedule {
  id: number;
  tripId: number;
  date: string;
  content: string;
  time?: string;
  address?: string;
  description?: string;

  transport?: TransportRoute[];
}

export interface TransportRoute {
  id: number;
  mode: TransportMode;
  from: string;
  to: string;
  memo?: string;
}

export type TransportMode = (typeof TRANSPORT_MODES)[number];

export const TRANSPORT_MODES = [
  'walk',
  'car',
  'taxi',
  'bus',
  'subway',
  'train',
  'plane',
  'ship',
  'bike',
  'etc',
] as const;
