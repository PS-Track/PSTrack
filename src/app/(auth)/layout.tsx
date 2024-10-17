import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/toaster'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md justify-center">{children}</div>
      <Toaster />
    </div>
  )
}
