import React from 'react'

const Message = () => {
  return (
    <div className='message owner'>
      <div className='messageInfo'>
      <img src='https://images.unsplash.com/photo-1662659511992-b84858a3e1d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80' alt='moreno profile image'/>
      <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>hello</p>
        <img src='https://images.unsplash.com/photo-1662659511992-b84858a3e1d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80' alt='moreno profile image'/>
      </div>
    </div>
  )
}

export default Message