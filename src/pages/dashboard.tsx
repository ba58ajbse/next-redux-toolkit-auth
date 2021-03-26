import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth, resetAuthenticate } from '../store/slices/authSlice'
import { auth } from '../utils/firebase'

const DashboardPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector(selectAuth)

  useEffect(() => {
    if (!userState.authenticated) {
      router.push('/login')
    }
  }, [userState.authenticated])

  const logOut = async () => {
    try {
      await auth.signOut()
      dispatch(resetAuthenticate())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>{userState.uid}</p>
      <button onClick={logOut}>logout</button>
    </div>
  )
}

export default DashboardPage