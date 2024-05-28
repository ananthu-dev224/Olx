import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useContext, } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FirebaseContext } from '../../store/Context'
import { toast } from 'react-toastify';


import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')

  const { auth, firestore } = useContext(FirebaseContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (userName.trim() === '' || email.trim === '' || number.trim() === '' || password.trim() === '') {
        return toast.error('Please fill out the fields')
      }

      const result = await auth.createUserWithEmailAndPassword(email, password)
      const user = result.user
      await user.updateProfile({ displayName: userName })
      await firestore.collection('users').add({
        id: user.uid,
        username: userName,
        phone: number,
        favorites : [""]
      })
      toast.success('Account created successfully')
      history.push('/login')
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('The email address is already in use');
          break;
        case 'auth/invalid-email':
          toast.error('The email address is invalid');
          break;
        case 'auth/weak-password':
          toast.error('The password is too weak. Please choose a stronger password');
          break;
        default:
          toast.error('An error occurred while signing up. Please try again later');
      }

    }
  }

 

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img><br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="femail">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="femail"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="fphone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="fphone"
            name="phone"
            onChange={(e) => setNumber(e.target.value)}
          />
          <br />
          <label htmlFor="fpassword">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="fpassword"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login' className='login-link'>Login</Link>
      </div>
    </div>
  );
}
