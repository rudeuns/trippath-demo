import type { Metadata } from 'next';
import { TripProvider } from '@/context/trip-context';
import { ScheduleProvider } from '@/context/schedule-context';
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
      <body className="flex min-h-dvh overflow-y-auto antialiased lg:bg-neutral-200">
        <main className="bg-background mx-auto flex w-full flex-col lg:max-w-md">
          <TripProvider>
            <ScheduleProvider>
              {children}
              <Toaster position="top-center" />
            </ScheduleProvider>
          </TripProvider>
        </main>
      </body>
    </html>
  );
}
