import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { setAuthenticate } from '../store/slices/authSlice'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router  = useRouter()
  const dispatch = useDispatch()

  const logIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await auth.signInWithEmailAndPassword(email, password)
      if (res.user) {
        dispatch(setAuthenticate(res.user.uid))
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ marginTop: 60 }}>
      <form onSubmit={logIn}>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link href='/signup'><a>to signup</a></Link>
    </div>
  )
}

export default LoginPage
