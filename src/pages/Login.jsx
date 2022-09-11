import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      setErr(true)
    }
  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Nima Chat</span>
        <div className='login'>Login</div>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button>Login</button>
        </form>
        <p>
          You do have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
