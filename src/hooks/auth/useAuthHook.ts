import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { createClient } from '@/db/supabase/client'
import {
  logoutAsync,
  setSession,
  setUser,
  siginUpWithEmailAndPasswordAsync,
} from '@/store/slices/authSlice'

export function useAuthHook() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  const hasSetupListener = useRef(false)

  useEffect(() => {
    // If the listener is already set up, do nothing
    if (hasSetupListener.current) return

    const supabase = createClient()

    // Set up a listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // Update the session in the Redux store
      dispatch(setSession(session))
      if (session) {
        // If a session exists, fetch the latest user data
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          // Update the user in the Redux store
          dispatch(setUser(user ?? null))
        }
      } else {
        // If no session exists, set the user to null
        dispatch(setUser(null))
      }
    })

    // Get the current session on component mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      // Update the session in the Redux store
      dispatch(setSession(session))
      if (session) {
        // Fetch the latest user data if a session exists
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          // Update the user in the Redux store
          dispatch(setUser(user ?? null))
        }
      } else {
        // Set the user to null if no session exists
        dispatch(setUser(null))
      }
    })

    // Mark that the listener has been set up
    hasSetupListener.current = true
    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => authListener?.subscription?.unsubscribe()
  }, [dispatch])

  const handleRegister = async (email: string, password: string) => {
    const res = await dispatch(
      siginUpWithEmailAndPasswordAsync({
        email,
        password,
      })
    )

    if (siginUpWithEmailAndPasswordAsync.fulfilled.match(res)) {
      router.push('/')
    } else if (siginUpWithEmailAndPasswordAsync.rejected.match(res)) {
      throw new Error(res.error.message)
    }
  }

  const handleLogout = async () => {
    const res = await dispatch(logoutAsync())
    if (logoutAsync.fulfilled.match(res)) {
      router.push('/login')
    } else if (logoutAsync.rejected.match(res)) {
      throw new Error(res.error.message)
    }
  }

  return {
    user,
    isLoading,
    error,
    handleRegister,
    handleLogout,
  }
}
