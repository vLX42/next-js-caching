import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 15 Caching Showcase',
  description: 'Explore the newest and most powerful caching strategies in Next.js 15, including beta features and performance optimizations.',
  keywords: 'Next.js, caching, performance, React, SSR, API routes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
