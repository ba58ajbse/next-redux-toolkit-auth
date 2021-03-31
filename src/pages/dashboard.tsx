import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'
import GroupCreateForm from '../components/GroupCreateForm'

const DashboardPage = () => {
  const router = useRouter()
  const userState = useSelector(selectAuth)

  useEffect(() => {
    if (!userState.authenticated) {
      router.push('/login')
    }
  }, [userState.authenticated])

  const groups = userState.groupList.map((group) => <li key={group.id}>groupList: {group.name}</li>)

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>ようこそ、{userState.name}</p>
      {userState.groupList && <ul>{groups}</ul>}
      <GroupCreateForm />
    </div>
  )
}

export default DashboardPage
