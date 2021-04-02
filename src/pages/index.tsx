import Dashboard from './dashboard'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'
import LoginPage from './login'

const IndexPage = () => {
  const authenticated = useSelector(selectAuth).authenticated

  return (
    <>
      {authenticated ? <Dashboard /> : <LoginPage />}
    </>
  )
}

export default IndexPage
