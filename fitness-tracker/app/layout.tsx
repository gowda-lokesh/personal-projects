import './globals.css'
import type { Metadata, Viewport } from 'next'
import SessionCompletionStat from '../components/SessionCompletionStat'

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
  return <html lang="en"><body>{children}<SessionCompletionStat /></body></html>
}
