import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap'
import { getStorage, ref, deleteObject, listAll, getDownloadURL } from 'firebase/storage'
import { FileImage, Trash } from 'react-bootstrap-icons'
import { getAuth  , onAuthStateChanged} from 'firebase/auth';
import '../App.css';

const auth = getAuth();
var uid = null;
function Displayfile({ data }){
    
    const storage = getStorage();
    
    var [files, setfiles] = useState(data);
    useEffect(() => {
        if (data) {
            setfiles(data);
        }
    }, [data]);
    
    
    
    function updateData(){
        var listRef; 
        listRef = data[0][3];
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
                        setfiles(oldArray => [...oldArray, [itemRef.name, url, itemRef.fullPath, listRef]]);
                    });
                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
        }
        function deleteData(s) {
            const Ref = ref(storage, s);
            deleteObject(Ref).then(() => {
                updateData();
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error);
            });
        }
        //const Example = () =>
    //    Object.entries(data).map(([k, v]) => (
    //        <Table striped bordered hover>
    //            <br />
    //            <tr key={k}>
    //                <td>
    //                    <a className="link-success nounderline" href={data[k][1]} target="_blank">{data[k][0]}</a>
    //                </td>
    //            </tr>
    //        </Table>
    //    ));
    return <>
        <br />
        <br />
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>File Name</th>
                </tr>
            </thead>
            <tbody>
                <td>
                    {files.map((i) => <tr>
                        <br />
                        <a href={i[1]} target="_blank" style={{ textDecoration: 'none', paddingTop: 20 }} >
                            {i[0]}</a>
                    </tr>)}
                </td>
                <td>
                    {files.map((i) => <tr>
                        <br />
                        <Button className='idxbtn' variant='warning' onClick={() => { deleteData(i[2]) }} >
                            <Trash size={20} />
                        </Button>
                    </tr>)}
                </td>
            </tbody>
        </Table>
    </ >
}

export default Displayfile;
 