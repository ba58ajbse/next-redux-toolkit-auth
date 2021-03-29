import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthType = {
  user: {
    uid: string
    name: string
    groupId: string[]
    authenticated: boolean
  }
}
type UserInfoType = {
  uid: string
  name: string
  groupId: string[]
}

const initialState: AuthType = {
  user: {
    uid: '',
    name: '',
    groupId: [],
    authenticated: false,
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate: (state, action: PayloadAction<UserInfoType>) => {
      return {
        ...state.user,
        user: {
          uid: action.payload.uid,
          name: action.payload.name,
          groupId: action.payload.groupId,
          authenticated: true
        }
      }
    },
    resetAuthenticate: (state) => {
      return {
        ...state.user,
        user: {
          uid: '',
          name: '',
          groupId: [],
          authenticated: false,
        }
      }
    },
    setGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: {
          ...state.user,
          groupId: [
            ...state.user.groupId, action.payload
          ]
        }
      }
    }
  }
})

export const { setAuthenticate, resetAuthenticate, setGroup } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth.user

export default authSlice.reducer
