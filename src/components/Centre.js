import React , {useState} from 'react';
import { Container ,Modal  ,Button ,Alert } from 'react-bootstrap';
import Displayfile from './Displayfile';
import Filesection from './Filesection';
import {getAuth , onAuthStateChanged, sendEmailVerification} from 'firebase/auth'
import Uploadfile from './Uploadfile';
import {useNavigate } from 'react-router-dom'
function Centre() {
  const auth = getAuth(); 
  let navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showAlert, setshowAlert] = useState(false)
  const [dis, setdis] = useState(false)
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  }
  const handleResend=()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      setshowAlert(true);
      setdis(true)
      setTimeout(() => {
        setshowAlert(false)
      }, 5000);
    })
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(user.emailVerified===true){
        setShow(false)
      }else{
        setShow(true);
      }
    }
});     

    return <div>
        <>
      <Modal show={show} onHide={handleClose}>
      <Alert show={showAlert} variant="success">
        <p>
         Email Verification link sent. 
        </p>
      </Alert>
        <Modal.Header >
          <Modal.Title>Please Verify Your Email first </Modal.Title>
        </Modal.Header>
        <Modal.Body>Check your email box. Reload after clicking verification link.  </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleResend} disabled={dis} >
            Resend email verification Link
        </Button>       
        <Button variant="danger" onClick={handleLogout} >
            Logout
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  <Container>
        <Uploadfile/>
        <br>
        </br>
        <Filesection/>
        <br />      
  </Container>
    
    </div>;
}

export default Centre;
