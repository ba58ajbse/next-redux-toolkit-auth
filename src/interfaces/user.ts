export type AuthType = {
  user: {
    uid: string
    name: string
    groupList: GroupType[]
    authenticated: boolean
  }
}

export type UserInfoType = {
  uid: string
  name: string
  groupList: GroupType[]
}

export type GroupType = {
  id: string
  name: string
}