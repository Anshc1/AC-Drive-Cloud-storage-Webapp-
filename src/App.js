import React from 'react';
import Commonform from './components/commonform';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { app } from './firebaseconfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword ,sendEmailVerification } from 'firebase/auth'
import Dashboard from './components/dashbord';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/welcome';
import Changepassword from './components/Changepassword'
import { Alert, CloseButton } from 'react-bootstrap'
function App() {
  const [err, seterr] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [done, setdone] = useState(false);
  const navigate = useNavigate();

  function handleAction(id) {
    const auth = getAuth();
    
    if (id == 2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              // ...
              seterr(" Email verification sent! "); 
            });
         // navigate('/dashboard')
         // sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      
          setShow(true);
          setTimeout(function () {
            setShow(false);
          }, 4000);
          navigate('/login'); 
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/wrong-password') {
            seterr('Please check your password')
          }
          if (error.code === 'auth/user-not-found') {
            seterr('User Not Found')
          }else{
            seterr(error.code); 
          }
          setShow(true);
          setTimeout(function () {
            setShow(false);
          }, 4000);
        })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          navigate('/dashboard')
         
        })
        .catch((error) => {
        
          if (error.code === 'auth/wrong-password') {
            seterr('Please check your password')
          }
          if (error.code === 'auth/user-not-found') {
            seterr('User Not Found')
          }else{
            seterr(error.code); 
          }
          setShow(true);
          setTimeout(function () {
            setShow(false);
          }, 4000);
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
        <Alert show={show} variant="success">
          <div className='d-flex justify-content-between'>
            {err}
            <CloseButton onClick={() => setShow(false)} />
          </div>
        </Alert>
        <Routes>
          <Route path='/' exact element={<Welcome />} />
          <Route path='/login' element={<Commonform title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
          <Route path='/signup' element={<Commonform title="Signup" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/changepassword' element={<Changepassword />} />
        </Routes>
      </>
    </div>
  )
}

export default App;
