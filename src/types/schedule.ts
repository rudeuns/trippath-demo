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

export type TransportMode =
  | 'walk'
  | 'car'
  | 'taxi'
  | 'bus'
  | 'subway'
  | 'train'
  | 'plane'
  | 'ship'
  | 'bike'
  | 'etc';
