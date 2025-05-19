'use client';

import { useRouter } from 'next/navigation';
import { useTripContext } from '@/context/trip-context';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Trip } from '@/types/trip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CalendarDaysIcon,
  MapPinIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';

interface TripHeaderProps {
  trip: Trip;
}

export default function TripHeader({ trip }: TripHeaderProps) {
  const { removeTrip } = useTripContext();
  const router = useRouter();

  function handleDelete() {
    const confirmed = window.confirm(
      '여행 삭제 시 모든 일정 정보가 사라집니다. 정말로 삭제하시겠습니까?',
    );
    if (confirmed) {
      removeTrip(trip.id);
      router.push('/trips');
    }
  }

  return (
    <div className="bg-background sticky top-0 z-10 flex items-start justify-between gap-2 border-b p-4">
      <div className="flex flex-col gap-1">
        <h1 className="pb-1 font-semibold">{trip.title}</h1>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPinIcon className="size-3.5 flex-none" />
          <span>{trip.destination}</span>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <CalendarDaysIcon className="size-3.5 flex-none" />
          <span>
            {format(trip.startDate, 'yyyy.MM.dd')} ~{' '}
            {format(trip.endDate, 'yyyy.MM.dd')}
          </span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-7 p-1">
            <MoreVerticalIcon className="text-muted-foreground size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => toast.info('준비 중인 기능입니다.')}
            >
              <PencilIcon />
              여행 편집
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <TrashIcon />
              여행 삭제
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
