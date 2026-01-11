'use client'

import { Playfair_Display, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { NoiseOverlay } from '@/components/layout/noise-overlay'
import { BackgroundEffects } from '@/components/layout/background-effects'

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const notoSansKr = Noto_Sans_KR({
  variable: '--font-korean',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <title>XLOV Experience | 당신이 완성하는 XLOV</title>
        <meta name="description" content="XLOV + EVOL = LOVE. 팬이 아이돌의 정체성을 완성하는 인터랙티브 체험" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta property="og:title" content="XLOV Experience" />
        <meta property="og:description" content="당신이 완성하는 XLOV의 세계" />
        <meta name="theme-color" content="#0A0A0B" />
      </head>
      <body
        className={`${playfair.variable} ${notoSansKr.variable} font-korean antialiased bg-[var(--background)] text-[var(--text-primary)] min-h-screen overflow-x-hidden`}
      >
        <BackgroundEffects />
        <NoiseOverlay />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
