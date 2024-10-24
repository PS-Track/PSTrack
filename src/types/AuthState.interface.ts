import { Session, User } from '@supabase/auth-js'

export interface IAuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: string | null
}
