import './globals.css'
import './typography.css'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import SessionCompletionStat from '../components/SessionCompletionStat'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Fitness Tracker',
  description: 'Strength, cardio and activity tracker',
  applicationName: 'Fitness Tracker',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#111827',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={inter.variable}>{children}<SessionCompletionStat /></body></html>
}
