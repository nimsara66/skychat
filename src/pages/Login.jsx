const Login = () => {
  return (
    <div className="formContainer">
      <div className='formWrapper'>
        <span className='logo'>Nima Chat</span>
        <div className='login'>Login</div>
        <form>
          <input type='text' placeholder="Display Name"/>
          <input type='email' placeholder="Email"/>
          <input type='password' placeholder="Password"/>
          <button>Login</button>
        </form>
        <p>You do have an account? Register</p>
      </div>
    </div>
  )
}

export default Login