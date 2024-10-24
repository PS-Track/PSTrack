import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@supabase/auth-js'

import { login, logout, register } from '@/db/auth.service'
import { IAuthState } from '@/types/AuthState.interface'

const initialState: IAuthState = {
  user: null,
  session: null,
  isLoading: false,
  error: null,
}

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await register({ email, password })
    return { user: data?.user, session: data?.session }
  }
)

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await login({ email, password })
    return { user: data?.user, session: data?.session }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    clearUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      /** Register */
      .addCase(registerAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
      /** Login */
      .addCase(loginAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
      /** Logout */
      .addCase(logoutAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.isLoading = false
        state.error = null
        state.user = null
        state.session = null
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
