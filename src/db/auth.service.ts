'use server'

import { createClient } from '@/db/supabase/server'

/**
 * Registers a user with the given email and password.
 */
export async function register({ email, password }: { email: string; password: string }) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    console.log('register', error.message)
    throw error
  }

  return { data }
}

/**
 * Logs in a user using their email and password.
 */
export async function login({ email, password }: { email: string; password: string }) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.log('login', error.message)
    throw error
  }

  return { data }
}

/**
 * Logs out the current user.
 */
export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log('logout', error.message)
    throw error
  }
}
