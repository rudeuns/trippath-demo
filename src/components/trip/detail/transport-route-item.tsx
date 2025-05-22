'use client';

import { cn } from '@/lib/utils';
import { getModeName } from '@/lib/transport';
import { getModeIcon } from '@/lib/transport-icon';
import { TransportRoute } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { MoveRightIcon, NavigationIcon } from 'lucide-react';

interface TransportRouteItemProps {
  route: TransportRoute;
}

export default function TransportRouteItem({ route }: TransportRouteItemProps) {
  return (
    <div className={cn('flex gap-3 border-l-2 p-2 pr-1 shadow-sm')}>
      <div className={cn('flex w-8 flex-col items-center gap-1')}>
        {getModeIcon(route.mode)}
        <span className="text-[10px]">{getModeName(route.mode)}</span>
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm">
            {route.from}{' '}
            <MoveRightIcon strokeWidth={1.5} className="inline-block size-4" />{' '}
            {route.to}
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
