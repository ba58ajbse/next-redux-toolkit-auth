import Dashboard from './dashboard'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'

const IndexPage = () => {
  const router = useRouter()
  const userState = useSelector(selectAuth)

  if (!userState.authenticated) {
    router.push('/login')
  }

  return (
    <>
      <Dashboard />
    </>
  )
}

export default IndexPage
