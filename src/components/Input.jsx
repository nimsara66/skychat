import React, { useState } from 'react'
import Img from '../assets/img/img.png'
import Attach from '../assets/img/attach.png'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'
import {
  arrayUnion,
  Timestamp,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uuidv4 } from '@firebase/util'
import { db, storage } from '../firebase'

const Input = () => {
  const { currentUser } = useAuthContext()
  const { data } = useChatContext()

  const [text, setText] = useState('')
  const [img, setImg] = useState(null)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4())

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          } catch (err) {
            console.log(err)
          }
        })
      })
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    setText('')
    setImg(null)
  }

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='send'>
        <img src={Attach} alt='' />
        <input
          type='file'
          style={{ display: 'none' }}
          id='file'
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor='file'>
          <img src={Img} alt='' />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
