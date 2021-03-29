import React, { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, setGroup } from '../store/slices/authSlice'
import firebase, { db } from '../utils/firebase'

const GroupCreateForm = () => {
  const [groupName, setGroupName] = useState('')
  const uid = useSelector(selectAuth).uid

  const createGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (groupName === '') return
    try {
      const res = await db.collection('groups').add({
        groupName,
        admin: uid,
        member: [uid]
      })
      console.log(res.id)
      let id
      await db.collection('users')
              .where('uid', '==', uid)
              .get()
              .then((snapshots) => {
                snapshots.forEach((doc) => {
                  id = doc.id
                })
              })
      await db.collection('users').doc(id).update({
          groupId: firebase.firestore.FieldValue.arrayUnion(res.id)
      })
      setGroup(res.id)
      alert('グループが作成出来ました')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h4>グループを作成する</h4>
      <form onSubmit={createGroup}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default GroupCreateForm