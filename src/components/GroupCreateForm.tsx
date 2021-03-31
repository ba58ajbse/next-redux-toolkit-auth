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
      // 同じ管理者が同じ名前を作成しようとした場合リターン
      const groupsSnapshots = await db.collection('groups').get()
      const isExistsName = groupsSnapshots.docs.some((doc) => doc.data().groupName === groupName && doc.data().admin === uid)
      if (isExistsName) {
        alert('同じ管理者が同じ名前のグループを作成することは出来ません')
        return
      }

      const res = await db.collection('groups').add({
        groupName,
        admin: uid,
        member: [uid]
      })

      const groupInfo = {
        id: res.id,
        name: groupName
      }

      const query = await db.collection('users').get()
      const ref = query.docs.find((doc) => doc.data().uid === uid)
      if (ref !== undefined && ref.exists) {
        ref.ref.update({
          groupList: firebase.firestore.FieldValue.arrayUnion(groupInfo)
        });
      }
      setGroup(groupInfo)
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