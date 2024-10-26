import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import AuthProvider from '@/components/auth/AuthProvider'
import Providers from '@/app/providers'
import './globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'

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
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
