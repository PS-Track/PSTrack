'use client'

import { ReactNode } from 'react'
import { useEffect } from 'react'

import { createClient } from '@/db/supabase/client'
import { setUser, clearUser } from '@/store/slices/authSlice'
import { useAppDispatch } from '@/store/hooks'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('user', session.user)
        dispatch(setUser(session.user))
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setUser(session.user))
        console.log('user', session.user)
      } else {
        dispatch(clearUser())
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch, supabase.auth])

  return <>{children}</>
}
