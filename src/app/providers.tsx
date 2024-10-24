'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { makeStore } from '@/store'
import { Toaster } from '@/components/ui/toaster'

const store = makeStore()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  )
}
