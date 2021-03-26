import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthType = {
  user: {
    uid: string
    authenticated: boolean
  }
}

const initialState: AuthType = {
  user: {
    uid: '',
    authenticated: false,
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate: (state, action: PayloadAction<string>) => {
      return {
        ...state.user,
        user: {
          uid: action.payload,
          authenticated: true
        }
      }
    },
    resetAuthenticate: (state) => {
      return {
        ...state.user,
        user: {
          uid: '',
          authenticated: false,
        }
      }
    }
  }
})

export const { setAuthenticate, resetAuthenticate } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth.user

export default authSlice.reducer
