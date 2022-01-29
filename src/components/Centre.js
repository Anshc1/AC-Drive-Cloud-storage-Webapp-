import React , {useState} from 'react';
import { Container } from 'react-bootstrap';
import Displayfile from './Displayfile';
import Filesection from './Filesection';

import Uploadfile from './Uploadfile';

function Centre() {
    return <div>
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
