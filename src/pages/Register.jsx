import { useState } from 'react'
import Add from '../assets/img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '../firebase'

const Register = () => {
  const [err, setErr] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].value
    const extension = file.split('.').pop()

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}.${extension}`)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL)
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
          })
        }
      )
    } catch (error) {
      setErr(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Nima Chat</span>
        <div className='register'>Register</div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Display Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input style={{ display: 'none' }} type='file' id='file' />
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
