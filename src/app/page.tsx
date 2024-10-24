'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { user, handleLogout } = useAuth()

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <span>{user?.email || null}</span>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  )
}
