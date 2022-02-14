import { getAuth } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom'
import Centre from './Centre';
import Navbarr from './Navbarr'
function Dashboard() {
    let navigate = useNavigate(); 
    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token')
        if(authToken){
            navigate('/dashboard')
        }else{
            navigate('/login')
        }
    }, []); 
    
    return(
    <>
     <Navbarr/>
     <br></br>
     <Centre/>
    </> 
    )
}

export default Dashboard

