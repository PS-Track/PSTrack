import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import AuthProvider from '@/components/auth/AuthProvider'
import Providers from '@/app/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PSTrack App',
  description: 'Track your problem-solving progress',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <AuthProvider>
          <body className={inter.className}>{children}</body>
        </AuthProvider>
      </Providers>
    </html>
  )
}
