import Link from 'next/link';
import Logo from '@/components/common/logo';
import SignupForm from '@/components/auth/signup-form';
import { ArrowLeftIcon } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="relative flex justify-center">
        <Logo />
        <Link href="/" className="absolute top-1/2 left-0 -translate-y-1/2">
          <ArrowLeftIcon />
        </Link>
      </div>

      <SignupForm />
    </div>
  );
}
