'use client';

import { TransportRoute } from '@/types/schedule';
import TransportRouteItem from '@/components/trip/detail/transport-route-item';
import TransportRouteForm from '@/components/trip/detail/transport-route-form';

interface TransportRouteSectionProps {
  scheduleId: number;
  routes?: TransportRoute[];
  isEditMode: boolean;
}

export default function TransportRouteSection({
  scheduleId,
  routes,
  isEditMode,
}: TransportRouteSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        {routes
          ? routes.map((route, i) => (
              <TransportRouteItem key={i} route={route} />
            ))
          : !isEditMode && (
              <p className="text-muted-foreground text-center text-sm">
                편집 모드를 눌러 추가해주세요.
              </p>
            )}
      </div>

      {isEditMode && (
        <div className="flex justify-center">
          <TransportRouteForm scheduleId={scheduleId} />
        </div>
      )}
    </div>
  );
}
