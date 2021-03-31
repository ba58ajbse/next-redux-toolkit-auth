import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth, db } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { setAuthenticate } from '../store/slices/authSlice'
import { GroupType } from '../interfaces/user'

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
        const data = await getName(res.user.uid)
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

  const getName = async (uid: string) => {
    let name = ''
    let groupList: GroupType[] = []
    await db.collection('users')
            .where('uid', '==', uid)
            .get()
            .then((snapshots) => {
              snapshots.forEach((doc) => {
                name = doc.data().name
                groupList = doc.data().groupList
              })
            })
            .catch((error) => console.log(error.message))
    return { name, groupList }
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