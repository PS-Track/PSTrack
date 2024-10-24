'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SignInTab from '@/components/auth/SignInTab'
import SignUpTab from '@/components/auth/SignUpTab'

// todo: add logo

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs
        defaultValue="signin"
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <SignInTab />
        <SignUpTab />
      </Tabs>
    </div>
  )
}
