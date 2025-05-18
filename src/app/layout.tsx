import type { Metadata } from 'next';
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
        </main>
      </body>
    </html>
  );
}
