import { useState } from 'react'
import Add from '../assets/img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const [err, setErr] = useState(false)
  const [imgUpload, setImgUpload] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, imgUpload).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            //create empty user chats on firestore
            // await setDoc(doc(db, 'userChats', res.user.uid), {})
            // navigate('/')
          } catch (err) {
            console.log(err)
            setErr(true)
          }
        })
      })
    } catch (error) {
      console.log(error)
      setErr(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Nima Chat</span>
        <div className='register'>Register</div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Display Name' required />
          <input type='email' placeholder='Email' required />
          <input type='password' placeholder='Password' required />
          <input
            style={{ display: 'none' }}
            accept='image/*'
            type='file'
            id='file'
            onChange={(e) => setImgUpload(e.target.files[0])}
            required
          />
          <label htmlFor='file'>
            <img src={Add} alt='add an avatar label image' />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register
