import { cn } from '@/lib/utils';
import { TransportRoute, TransportMode } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { CarFrontIcon, NavigationIcon } from 'lucide-react';

interface TransportRouteItemProps {
  route: TransportRoute;
}

export default function TransportRouteItem({ route }: TransportRouteItemProps) {
  function getModeName(mode: TransportMode) {
    switch (mode) {
      case 'walk':
        return '도보';
      case 'car':
        return '승용차';
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

  return (
    <div className={cn('flex gap-3 border-l-2 p-1 pl-2')}>
      <div className={cn('flex w-8 flex-col items-center gap-1')}>
        <CarFrontIcon className="size-5" />
        <span className="text-[10px]">{getModeName(route.mode)}</span>
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-start justify-between">
          <div className="text-sm font-medium">
            {route.from} → {route.to}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground size-6"
          >
            <NavigationIcon />
          </Button>
        </div>

        {route.memo && (
          <p className="text-muted-foreground text-xs">{route.memo}</p>
        )}
      </div>
    </div>
  );
}
