import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Favorite from './Pages/Favorite';

function App() {
  const { setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])
  return (

    <Router>
      <ToastContainer />
      <Switch>
        <Post>
          <Route path='/' exact component={Home} />
          <Route path='/Signup'>
            {auth.currentUser ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path='/login'>
            {auth.currentUser ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path='/sell' component={Create} />
          <Route path='/favorites' component={Favorite} />
          <Route path='/view-post' component={ViewPost} />
        </Post>
      </Switch>
    </Router>
  );
}

export default App;
