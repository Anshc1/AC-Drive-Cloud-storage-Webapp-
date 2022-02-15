import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Alert} from 'react-bootstrap'
import '../App.css'
import { getAuth, sendPasswordResetEmail  } from 'firebase/auth'
const photo = require('./imgmain.png');
const auth = getAuth();

function Commonform() {
    const [email, setemail] = useState("");
    const [Show, setShow] = useState(false);
    const [Show1, setShow1] = useState(false);
    const [err, seterr] = useState("");
    function handleAction() {
        sendPasswordResetEmail(auth, email)
            .then(() => {
              
                setShow(true); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              
                seterr(errorMessage); 
                setShow1(true); 
            });
    }
    return (
        <>
        <Alert show={Show} variant="success">
          <p>
           Email verification link sent to your email .Please check your emails.
           <Alert.Link href="/login">Back to login Page</Alert.Link>  
          </p>
        </Alert>
        <Alert show={Show1} variant="danger">
          <p>
              {err} 
          </p>
        </Alert>
        <div className="form ">
            <a href="/">
                <img src={photo} width="150"
                    height="150"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo" />
            </a>
            <div className="box">
                <div className="fs-1 fw-normal d-flex justify-content-center ">Reset Password</div>
                <Form className="flex-column d-flex justify-content-center">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter your Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} />
                        <Form.Text className="text-muted" >
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={handleAction} >
                        Send confirmation link
                    </Button>
                </Form>
            </div>
        </div>
    </>
    )
}

export default Commonform;
