import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState , useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FirebaseContext } from '../../store/Context';
import { toast } from 'react-toastify';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const history = useHistory()
  const {auth } = useContext(FirebaseContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email.trim() === '' || password.trim() === ''){
      return toast.error('Please fill the fields to log in')
    }
    try {
      await auth.signInWithEmailAndPassword(email,password)
      history.push('/')
    } catch (error) {
      switch(error.code){
        case 'auth/invalid-credential':
          toast.error('Email or Password is Invalid')
          break;
        default :
          toast.error('An error occured , please try again')
          break;
      }
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo' ></img>
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
