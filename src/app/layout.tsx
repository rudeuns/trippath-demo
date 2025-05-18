import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'TripPath',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased lg:bg-neutral-200">
        <main className="bg-background mx-auto min-h-dvh w-full overflow-y-auto lg:max-w-md">
          {children}
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}
