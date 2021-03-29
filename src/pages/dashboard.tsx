import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'

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
      <p>{userState.uid}</p>
    </div>
  )
}

export default DashboardPage