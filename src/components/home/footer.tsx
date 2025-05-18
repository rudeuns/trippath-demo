import Logo from '@/components/common/logo';

export default function Footer() {
  return (
    <footer className="border-t px-2 py-4">
      <div className="flex flex-col items-center gap-2">
        <Logo size="sm" />
        <div className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} TripPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
