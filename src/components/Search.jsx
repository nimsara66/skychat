import { useState } from 'react'
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

const Search = () => {
  const { currentUser } = useAuthContext()

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handleSearch = async () => {
    // Create a reference to the cities collection
    const citiesRef = collection(db, 'users')

    // Create a query against the collection.
    const q = query(citiesRef, where('displayName', '==', username))

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (error) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { message: [] })

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (error) {}
    setUser(null)
    setUsername('')
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      {err && <span>User not found!</span>}

      {user && (
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
