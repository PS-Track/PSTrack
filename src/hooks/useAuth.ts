'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginAsync, logoutAsync, registerAsync } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  /**
   * Handles a register request.
   */
  const handleRegister = async ({ email, password }: { email: string; password: string }) => {
    const res = await dispatch(registerAsync({ email, password }))

    if (registerAsync.fulfilled.match(res)) {
      router.push('/')
    } else if (registerAsync.rejected.match(res)) {
      console.log(res.payload)
      throw new Error(res.error.message)
    }
  }

  /**
   * Handles a login request.
   */
  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    const res = await dispatch(loginAsync({ email, password }))

    if (loginAsync.fulfilled.match(res)) {
      router.push('/')
    } else if (loginAsync.rejected.match(res)) {
      console.log(res.payload)
      throw new Error(res.error.message)
    }
  }

  /**
   * Logs out the user by dispatching the logoutAsync action and redirects to the /auth route.
   */
  const handleLogout = async () => {
    await dispatch(logoutAsync())
    router.push('/auth')
  }

  return {
    user,
    isLoading,
    error,
    handleRegister,
    handleLogin,
    handleLogout,
  }
}
