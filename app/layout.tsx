import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'도쿄 크리스마스 · 리미 티고 요니', description:'2026년 12월 9–13일, 세 사람의 모바일 여행 일정', manifest:'/manifest.json' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ko"><body>{children}</body></html>}
