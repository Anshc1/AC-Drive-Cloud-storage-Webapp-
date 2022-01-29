import React, { useState } from 'react';
import { ButtonGroup, Button ,Badge } from 'react-bootstrap'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import Displayfile from './Displayfile';
import {FileImage ,FileEarmark , CollectionPlayFill ,Files} from 'react-bootstrap-icons'
const auth = getAuth();
let uid =null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;    
    }
}); 

function Filesection() {
    const [type, settype] = useState("");
    const [files, setfiles] = useState([]);
    const storage = getStorage();
    
    
    function displayFile(s) { 
        let listRef ; 
        if(s === "img"){
            settype("Images"); 
            listRef = ref(storage, 'images/' + uid);
        }
        if(s === "docs"){
            settype("Documents")
            listRef = ref(storage, 'docs/' + uid ); 
        }
        if(s === "video"){
            settype("Videos")
            listRef = ref(storage, 'videos/' + uid ); 
        }
        listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            setfiles([])
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((downloadURL) => {
                    let url = downloadURL;
                    setfiles(oldArray => [...oldArray ,[itemRef.name, url ,itemRef.fullPath ,listRef ]]);
                });
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    } 

    var Dis=()=>{
            var icon ; 
            if(type=="Images"){
                icon = <FileImage/>
            }
            if(type=="Documents"){
                icon = <FileEarmark/>
            }
            if(type=="Videos"){
                icon = <CollectionPlayFill/>
            }

            if(type == ""){
                return(
                    <div></div>
                )
            }
            return(
            <div  className='bdge' >
               {icon}
                {type}
                </div>
            )
        }
    return(
    <div>
        <ButtonGroup size="lg" className="mb-2">
        <Button variant='outline-primary'  onClick={()=>{displayFile("img")}}><FileImage size={40}/></Button>
        <br />
        <Button variant='outline-primary' onClick={()=>{displayFile("docs")}}><FileEarmark size={40}/></Button>
        <br />
        <Button variant='outline-primary' onClick={()=>{displayFile("video")}}><CollectionPlayFill size={40}/></Button>
        </ButtonGroup>
         <br />
         <br />
        <Dis />
        <Displayfile data= {files}/>
    </div>
    );    
}

export default Filesection;
