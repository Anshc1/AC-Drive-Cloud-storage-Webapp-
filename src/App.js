import React from 'react';
import Commonform from './components/commonform';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { app } from './firebaseconfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Dashboard from './components/dashbord';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/welcome';

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const handleAction = (id) => {
    console.log(id);
    const auth = getAuth();
    if (id == 2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          navigate('/dashboard')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check your password')
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('User Not Found')
          }
        })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          navigate('/dashboard')
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check your password')
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('User Not Found')
          }
        })
    }
  }
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/dashboard')
    }
  }, [])
  return (
    <div>
      <>
        <ToastContainer />
        <Routes>
          <Route path='/' exact element={<Welcome />} />
          <Route path='/login' element={<Commonform title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
          <Route path='/signup' element={<Commonform title="Signup" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </>
    </div>
  )
}

export default App;
