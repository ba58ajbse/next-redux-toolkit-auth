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
        const data = await getUser(res.user.uid)
        if (data === null) {
          alert('ログインに失敗しました')
          return
        }
        const userInfo = {
          uid: res.user.uid,
          name: data.name,
          groupList: data.groupList,
        }

        dispatch(setAuthenticate(userInfo))
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const getUser = async (uid: string) => {
    const userSnapshots = await db.collection('users').get()
    const userRef = userSnapshots.docs.find((doc) => doc.data().uid === uid)
    if (userRef !== undefined && userRef.exists) {
      const name = userRef.data().name
      const groupList = userRef.data().groupList
      return { name, groupList }
    }
    return null
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