import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Nav, NavDropdown } from 'react-bootstrap'
import {BoxArrowRight} from 'react-bootstrap-icons'
const photo = require('./imgmain.png');

function Navbarr() {
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login');
    }
    return <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <img src={photo} width="40"
                    height="40"
                    className="navlogo d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                <Navbar.Brand  >AC-Drive</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Button variant="outline-danger" onClick={handleLogout} ><BoxArrowRight size={20}/> Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>;
}

export default Navbarr;
