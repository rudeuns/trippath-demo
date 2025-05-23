'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SamplePage() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <p className="text-center">예시를 준비중입니다.</p>

      <Link href="/">
        <Button>홈으로 이동</Button>
      </Link>
    </div>
  );
}
