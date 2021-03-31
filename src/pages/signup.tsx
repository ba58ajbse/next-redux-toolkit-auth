import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth, db } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { setAuthenticate } from '../store/slices/authSlice'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router  = useRouter()
  const dispatch = useDispatch()

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      if (res.user) {
        const userInfo = {
          uid: res.user.uid,
          name: name,
          groupList: [],
        }

        const storeRes = await db.collection('users').add(userInfo)
        if (storeRes) {
          dispatch(setAuthenticate(userInfo))
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={signUp}>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
      </form>
      <Link href='/login'><a>to login</a></Link>
    </div>
  )
}

export default SignUpPage