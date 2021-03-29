import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth, db } from '../utils/firebase'
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
        const name = await getName(res.user.uid)
        if (name) {
          const userInfo = {
            uid: res.user.uid,
            name: name,
            groupId: [],
          }
          dispatch(setAuthenticate(userInfo))
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const getName = async (uid: string) => {
    let info
    await db.collection('users')
            .where('uid', '==', uid)
            .get()
            .then((snapshots) => {
              snapshots.forEach((doc) => {
                console.log(doc.data())
                info = doc.data().name
              })
            })
            .catch((error) => console.log(error.message))
    return info
  }

  return (
    <div>
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