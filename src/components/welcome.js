import React from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css'

const photo = require('./imgmain.png'); 
function Welcome() {
    return(
    <div className="form ">
        <img src= {photo} width="150"
                    height="150"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo" />
        <div className="box d-grid gap-3">
            <h1>Welcome to AcDrive</h1> 
            <Button variant="outline-dark" href="/login">Log in</Button>
            <Button variant="outline-dark" href="signup">Create an Account</Button>
            <Button variant="outline-dark" href='/changepassword'>Forgot Password ?</Button>        
        </div>
    </div>
    )
}

export default Welcome;
