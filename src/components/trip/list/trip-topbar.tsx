import { Button } from '@/components/ui/button';
import { MenuIcon, PlusIcon } from 'lucide-react';

export default function TripTopbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MenuIcon />
        <h1 className="text-xl font-semibold">My Trips</h1>
      </div>

      <Button>
        <PlusIcon /> 새로운 여행
      </Button>
    </div>
  );
}
