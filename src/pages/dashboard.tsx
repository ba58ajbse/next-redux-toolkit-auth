import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'
import GroupCreateForm from '../components/GroupCreateForm'
import ProjectsList from '../components/ProjecsList'

const DashboardPage = () => {
  const router = useRouter()
  const userState = useSelector(selectAuth)

  useEffect(() => {
    if (!userState.authenticated) {
      router.push('/login')
    }
  }, [userState.authenticated])

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>ようこそ、{userState.name}</p>
      {userState.groupList && userState.groupList.map((group) => <ProjectsList key={group.id} group={group} />)}
      <GroupCreateForm />
    </div>
  )
}

export default DashboardPage
