import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlaneIcon } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="from-background to-muted flex flex-col gap-8 bg-gradient-to-b px-2 py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-primary/10 rounded-full p-3">
          <PlaneIcon className="size-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          쉽고 자유로운 여행 일정 만들기
        </h1>
        <p className="text-muted-foreground text-lg">
          복잡한 여행 계획도 쉽게! 원하는 일정과 정보를 자유롭게 담고, 한눈에
          보기 좋게 정리하세요.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link href="/trips">
          <Button className="gap-1">
            시작하기 <ArrowRightIcon />
          </Button>
        </Link>
        <Link href="/sample">
          <Button variant="outline">기능 살펴보기</Button>
        </Link>
      </div>
    </section>
  );
}
