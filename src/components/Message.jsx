import React, { useRef, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const { currentUser } = useAuthContext()
  const { data } = useChatContext()

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [message])

  return (
    <div
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className='messageInfo'>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt='moreno profile image'
        />
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='moreno profile image' />}
      </div>
    </div>
  )
}

export default Message
