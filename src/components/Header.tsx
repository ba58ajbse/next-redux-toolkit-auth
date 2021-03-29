import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetAuthenticate, selectAuth } from '../store/slices/authSlice'
import { auth } from '../utils/firebase'

const Header: FC = () => {
    const authenticated = useSelector(selectAuth).authenticated
    const dispatch = useDispatch()

    const logOut = async () => {
      try {
        await auth.signOut()
        dispatch(resetAuthenticate())
      } catch (error) {
        console.log(error.message)
      }
    }

    return (
      <header className="header">
        <h1>header</h1>
        {authenticated &&
          <button type="button" onClick={logOut}>logout</button>
        }
      </header>
    )
}

export default Header