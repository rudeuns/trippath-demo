import { PlaneIcon, CalendarIcon, MapIcon } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-10 px-8 py-12 text-center">
      <h2 className="text-2xl font-bold">TripPath 핵심 기능</h2>

      <div className="flex flex-col items-center gap-3">
        <div className="bg-primary/10 rounded-full p-3">
          <CalendarIcon />
        </div>
        <h3 className="text-xl font-semibold">세부 일정 관리</h3>
        <p className="text-muted-foreground">
          날짜별로 시간, 장소, 교통, 경로, 메모, 비용, 일기까지 포함된 일정을
          세밀하게 계획할 수 있어요.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="bg-primary/10 rounded-full p-3">
          <MapIcon />
        </div>
        <h3 className="text-xl font-semibold">여행 지도</h3>
        <p className="text-muted-foreground">
          지도 앱과 연동해 장소를 쉽게 추가하고, 여행 경로과 위치를 바로 확인할
          수 있어요.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="bg-primary/10 rounded-full p-3">
          <PlaneIcon />
        </div>
        <h3 className="text-xl font-semibold">모든 여행 단계에서 활용</h3>
        <p className="text-muted-foreground">
          여행 전에는 계획을 세밀하게 준비하고, 여행 중에는 일정을 쉽게 추가 및
          수정할 수 있고, 여행 후에는 모든 기록을 한 번에 모아볼 수 있어요.
        </p>
      </div>
    </section>
  );
}
