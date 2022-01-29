import React, { useState } from 'react';
import { Button, Container, Modal  ,  ProgressBar} from 'react-bootstrap'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {Folder2Open , FileImage , FileEarmark, CollectionPlayFill, DistributeVertical  } from 'react-bootstrap-icons'
import Centre from './Centre';
import Filesection from './Filesection';
const auth = getAuth();
var uid = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});
function Uploadfile() {

  const [show, setShow] = useState(false);
  const [status, setstatus] = useState();
  const [show1, setshow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [type, settype] = useState("");
  const storage = getStorage()
  
  function handleUpload1(e) {
    if (uid === null) {
      return;
    }
    settype("images")
    const file = e.target.files[0];
    const storageRef = ref(storage, 'images/' + uid + '/' + file.name)
    //main upload 
    const metadata = {
      contentType: 'image'
    }
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        setshow1(true); 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setstatus(progress); 
        if(progress === 100){
          setshow1(false)
          handleClose();  
          setstatus(0); 
        }
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );

  }
  function handleUpload2(e) {
    if (uid === null) {
      return;
    }
    const file = e.target.files[0];
    const storageRef = ref(storage, 'docs/' + uid + '/' + file.name)
    //main upload 
    const metadata = {
      contentType: 'docs'
    }
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        setshow1(true); 
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setstatus(progress); 
        if(progress === 100){
          setshow1(false)
          handleClose(); 
          setstatus(0); 
        }
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );

  }


  function handleUpload3(e) {

    if (uid === null) {
      return;
    }
    const file = e.target.files[0];
    const storageRef = ref(storage, 'videos/' + uid + '/' + file.name)
    //main upload 
    const metadata = {
      contentType: 'videos'
    }
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setshow1(true); 
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setstatus(progress); 
        if(progress === 100){
          setshow1(false)
          handleClose(); 
          setstatus(0); 
        }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );

  }
  return(
  <div>
    <>
      <Button variant= "outline-warning" size ="lg" onClick={handleShow}>
        <div style={{justifyItems:Centre}}>
      <Folder2Open size={45}  />
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Folder2Open size={40}/>
          <Modal.Title>UPLOAD FILES</Modal.Title>
        </Modal.Header>

          <Button variant ="outline-warning">
            <FileImage  size={30}/>
            <input type="file" onChange={handleUpload1} />
          </Button>
          <Button variant ="outline-warning">
            <FileEarmark size={30}/>
            <input type="file" onChange={handleUpload2} />
          </Button>
          <Button variant ="outline-warning" >
            <CollectionPlayFill  size={30}/>
            <input type="file" onChange={handleUpload3} />
          </Button>
        <Modal.Footer>
        </Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      </Modal>
    </>
    <Modal show={show1}  onHide={() => setshow1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Uploading....</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ProgressBar striped variant="success" now={status}/>
        </Modal.Body>
      </Modal>
  </div>
)
};


export default Uploadfile;
