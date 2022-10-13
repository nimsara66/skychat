import { doc, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import { Message } from './'

const Messages = () => {
  const { data } = useChatContext()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
