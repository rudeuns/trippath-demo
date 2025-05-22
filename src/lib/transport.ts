import type { TransportMode } from '@/types/schedule';

export function getModeName(mode: TransportMode): string {
  switch (mode) {
    case 'walk':
      return '도보';
    case 'car':
      return '자동차';
    case 'taxi':
      return '택시';
    case 'bus':
      return '버스';
    case 'subway':
      return '지하철';
    case 'train':
      return '기차';
    case 'plane':
      return '비행기';
    case 'ship':
      return '배';
    case 'bike':
      return '자전거';
    case 'etc':
    default:
      return '기타';
  }
}
