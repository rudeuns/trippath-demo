import { toast } from 'sonner';
import NewTripForm from '@/components/trip/list/new-trip-form';
import { MenuIcon } from 'lucide-react';

export default function TripTopbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MenuIcon onClick={() => toast.info('준비 중인 기능입니다.')} />
        <h1 className="text-xl font-semibold">My Trips</h1>
      </div>

      <NewTripForm />
    </div>
  );
}
