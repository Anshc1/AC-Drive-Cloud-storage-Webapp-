import React, { useState } from 'react';
import { Breadcrumb, Button, Modal, Form } from 'react-bootstrap'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { collection, addDoc , Timestamp  } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import db from '../firebaseconfig';

function Addfolder() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        const auth = getAuth()
        const uid = auth.currentUser.uid
        try {
            const docRef =  addDoc(collection(db, "users"), {
              name : name , 
              uid : uid,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
        console.log("hello");
        setName("")
        closeModal()
    }
    function openModal() {
        setOpen(true);
    }
    function closeModal() {
        setOpen(false)
    }
    return (
        <>
            <Button variant="success" onClick={openModal}>
                New Folder
            </Button>

            <Modal show={open} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail"  >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="New folder" />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default Addfolder;
