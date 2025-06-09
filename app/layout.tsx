"use client"
import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
        <div className="flex">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
