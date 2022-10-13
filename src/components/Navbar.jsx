import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useAuthContext()
  return (
    <div className='navbar'>
      <span className='logo'>Nima Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='user profile image' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
