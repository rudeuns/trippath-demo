'use client';

import { useScheduleContext } from '@/context/schedule-context';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getModeName } from '@/lib/transport';
import { getModeIcon } from '@/lib/transport-icon';
import { TransportRoute } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { MoveRightIcon, NavigationIcon, Trash2Icon } from 'lucide-react';

interface TransportRouteItemProps {
  scheduleId: number;
  route: TransportRoute;
  isEditMode: boolean;
}

export default function TransportRouteItem({
  scheduleId,
  route,
  isEditMode,
}: TransportRouteItemProps) {
  const { removeTransportRoute } = useScheduleContext();

  const handleDelete = () => {
    const confirmed = window.confirm('정말 여행 경로를 삭제하시겠습니까?');
    if (confirmed) removeTransportRoute(scheduleId, route.id);
  };

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

          {isEditMode ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/90 size-6 hover:text-white"
              onClick={handleDelete}
            >
              <Trash2Icon />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground size-6"
              onClick={() => toast.info('준비 중인 기능입니다.')}
            >
              <NavigationIcon />
            </Button>
          )}
        </div>

        {route.memo && (
          <p className="text-muted-foreground text-xs">{route.memo}</p>
        )}
      </div>
    </div>
  );
}
