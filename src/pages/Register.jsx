import Add from '../assets/img/addAvatar.png'

const Register = () => {
  return (
    <div className="formContainer">
      <div className='formWrapper'>
        <span className='logo'>Nima Chat</span>
        <div className='register'>Register</div>
        <form>
          <input type='text' placeholder="Display Name"/>
          <input type='email' placeholder="Email"/>
          <input type='password' placeholder="Password"/>
          <input style={{ display: 'none' }} type='file' id="file"/>
          <label htmlFor='file'>
            <img src={Add} alt='add an avatar label image'/>
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register