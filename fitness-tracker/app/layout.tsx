import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title:'Fitness Tracker', description:'Strength, cardio and activity tracker' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
