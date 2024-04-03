import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState , useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const history = useHistory()
  const {auth } = useContext(FirebaseContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if(email.trim() === '' || password.trim() === ''){
      return setError('Please fill the fields to log in')
    }
    try {
      await auth.signInWithEmailAndPassword(email,password)
      history.push('/')
    } catch (error) {
      switch(error.code){
        case 'auth/invalid-credential':
          setError('Email or Password is Invalid')
          break;
        default :
          setError('An error occured , please try again')
          break;
      }
    }
  }

  if(error){
    setTimeout(() => {
       setError('')
    }, 3000);
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo' ></img>
       {error &&  <div className='error'><span>{error}</span></div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup' className='signup-link'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
