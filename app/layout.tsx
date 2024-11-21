import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryStateProvider } from '@/hooks/query-state';
import { Harmony } from './harmony';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Venus Rings',
  description: 'Buy Custom Rings Online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryStateProvider>
        <html lang='en'>
          <body className={inter.className}>
            {children}
            <Harmony />
          </body>
        </html>
      </QueryStateProvider>
    </ClerkProvider>
  );
}
