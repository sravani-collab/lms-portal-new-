// app/layout.tsx or app/layout.jsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/components/custom/Sidebar';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS Dashboard',
  description: 'Assignments Dashboard for LMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
