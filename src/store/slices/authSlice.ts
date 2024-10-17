import { logOut, signUpWithEmailAndPassword } from '@/db/auth.service'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, User } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: string | null
}

export const siginUpWithEmailAndPasswordAsync = createAsyncThunk(
  'auth/siginUpWithEmailAndPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const { user, session } = await signUpWithEmailAndPassword(email, password)
    return { user, session }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logOut()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    session: null,
    isLoading: false,
    error: null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload
    },
    clearAuth: state => {
      state.user = null
      state.session = null
    },
  },
  extraReducers: builder => {
    builder
      /** Sign Up Via Email And Password */
      .addCase(siginUpWithEmailAndPasswordAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(siginUpWithEmailAndPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user as User
        state.session = action.payload.session as Session
      })
      .addCase(siginUpWithEmailAndPasswordAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
      /* Logout */
      .addCase(logoutAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.isLoading = false
        state.user = null
        state.session = null
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
  },
})

export const { setUser, setSession, clearAuth } = authSlice.actions
export default authSlice.reducer
