import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthType, UserInfoType, GroupType} from '../../interfaces/user'

// type AuthType = {
//   user: {
//     uid: string
//     name: string
//     groupList: GroupType[]
//     authenticated: boolean
//   }
// }
// type UserInfoType = {
//   uid: string
//   name: string
//   groupList: GroupType[]
// }
// type GroupType = {
//   id: string
//   name: string
// }

const initialState: AuthType = {
  user: {
    uid: '',
    name: '',
    groupList: [],
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
          groupList: [...state.user.groupList, ...action.payload.groupList],
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
          groupList: [],
          authenticated: false,
        }
      }
    },
    setGroup: (state, action: PayloadAction<GroupType>) => {
      return {
        ...state,
        user: {
          ...state.user,
          groupList: [
            ...state.user.groupList, action.payload
          ]
        }
      }
    }
  }
})

export const { setAuthenticate, resetAuthenticate, setGroup } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth.user

export default authSlice.reducer
