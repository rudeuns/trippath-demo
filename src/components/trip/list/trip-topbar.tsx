'use client';

import { toast } from 'sonner';
import NewTripForm from '@/components/trip/list/new-trip-form';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

export default function TripTopbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => toast.info('준비 중인 기능입니다.')}
        >
          <MenuIcon className="size-5" />
        </Button>
        <h1 className="text-xl font-semibold">My Trips</h1>
      </div>

      <NewTripForm />
    </div>
  );
}
