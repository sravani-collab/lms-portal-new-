import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'LMS Dashboard',
  description: 'Assignments Dashboard for LMS',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/country-flag-icons@1.3.0/css/flag-icons.min.css"
        />
      </head>
      <body className={inter.className}>
        {children}
       </body>
    </html>
  );
}
