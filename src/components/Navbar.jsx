import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Nima Chat</span>
      <div className='user'>
        <img src='https://images.unsplash.com/photo-1662659511992-b84858a3e1d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80' alt='moreno profile image'/>
        <span>Moreno</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar