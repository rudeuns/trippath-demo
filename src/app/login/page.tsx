import Link from 'next/link';
import Logo from '@/components/common/logo';
import LoginForm from '@/components/auth/login-form';
import { ArrowLeftIcon } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="relative flex justify-center">
        <Logo />
        <Link href="/" className="absolute top-1/2 left-0 -translate-y-1/2">
          <ArrowLeftIcon />
        </Link>
      </div>

      <LoginForm />
    </div>
  );
}
