import Link from 'next/link';
import Logo from '@/components/common/logo';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 border-b px-2 py-4">
      <div className="flex items-center justify-between gap-2">
        <Logo />

        <div className="flex items-center">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" size="sm">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
