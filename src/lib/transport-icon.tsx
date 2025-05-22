'use client';

import type { TransportMode } from '@/types/schedule';
import {
  BikeIcon,
  BusFrontIcon,
  CarFrontIcon,
  CarTaxiFrontIcon,
  CircleEllipsisIcon,
  FootprintsIcon,
  PlaneIcon,
  ShipIcon,
  TrainFrontIcon,
  TramFrontIcon,
} from 'lucide-react';

export function getModeIcon(mode: TransportMode) {
  switch (mode) {
    case 'walk':
      return <FootprintsIcon className="size-5" />;
    case 'car':
      return <CarFrontIcon className="size-5" />;
    case 'taxi':
      return <CarTaxiFrontIcon className="size-5" />;
    case 'bus':
      return <BusFrontIcon className="size-5" />;
    case 'subway':
      return <TramFrontIcon className="size-5" />;
    case 'train':
      return <TrainFrontIcon className="size-5" />;
    case 'plane':
      return <PlaneIcon className="size-5" />;
    case 'ship':
      return <ShipIcon className="size-5" />;
    case 'bike':
      return <BikeIcon className="size-5" />;
    case 'etc':
    default:
      return <CircleEllipsisIcon className="size-5" />;
  }
}
