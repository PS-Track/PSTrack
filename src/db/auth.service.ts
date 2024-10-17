'use server'

import { createClient } from '@/db/supabase/server'
import { revalidatePath } from 'next/cache'

export async function signUpWithEmailAndPassword(email: string, password: string) {
  const supabase = createClient()

  try {
    const { data } = await supabase.auth.signUp({
      email,
      password,
    })

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Error signing up with email and password', error)
    return { error: error }
  }
}

export async function logOut() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}
