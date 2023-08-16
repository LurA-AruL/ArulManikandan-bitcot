import React, { useEffect, useState } from 'react'
import { Modal,ModalBody,ModalHeader,ModalTitle,Form,FormLabel,FormControl } from 'react-bootstrap';

export default function UpdateContacts(props) {

    // UserContact useState
    // const [id,setId] = useState(props.phoNumber);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoNumber, setPhoNumber] = useState("");
    const [address, setAddress] = useState("");

    // fetch useState 
    const [usedata,setUseData] = useState([]);

    // use usestate Modal
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    // useEffect 
    useEffect(() => {
        handleUserData();        
    },[]);

    // fetch api
    const handleUserData = () => {
        fetch("http://localhost:5000/user_Data")
        .then((resq) => resq.json())
        .then((response) => {
            setUseData(response);
        })
    }

    // update userContacts
    const handelUpdateContact = (e) => {
        // setId(props.id)
        let userGetData = {name,email,phoNumber,address}
        console.log(userGetData);
            fetch(`http://localhost:5000/user_Data/${props.id}`,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-type":"application/json",
            },
            body:JSON.stringify(userGetData)
            })
            .then(req => req.json())
            .then(resp => {
                console.log(resp);     
                handleUserData();        
                props.fetchGetData();
            });

            handleClose();
        
        
    }

    // select UserData
    const handleSelect = (id) => { 
        let selectData = usedata[id]
        setName(selectData.name);
        setEmail(selectData.email);
        setAddress(selectData.address);
        setPhoNumber(selectData.phoNumber);
        props.spinner();
        setTimeout(() => {
            handleOpen();          
        }, 500); 
    }

  return (
    <>

        <div className='container'>

                {/* modal show button */}
                     <i className="bi bi-pencil-fill CreateIcon" onClick={(() => handleSelect(props.Index_id))}></i>
                {/* modal ui components*/}
                <Modal show={show} onHide={handleClose}>
                   <ModalHeader closeButton>
                        <ModalTitle className='text-secondary fw-bold'>
                         Update Contact
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={((e) => e.preventDefault())} className=' d-flex flex-column  gap-2'>
                            <div className='form-field'>
                                <FormLabel>Name:</FormLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Enter Name '
                                    className='me-2'
                                    value={name}
                                    onChange={((e) => setName(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <FormLabel>Email:</FormLabel>
                                <FormControl
                                    type='email'
                                    placeholder='Enter Email Id'
                                    className='me-2'
                                    value={email}
                                    onChange={((e) => setEmail(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <FormLabel>Phone:</FormLabel>
                                <FormControl
                                    type='number'
                                    placeholder='Phone Number'
                                    className='me-2'
                                    value={phoNumber}
                                    onChange={((e) => setPhoNumber(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <FormLabel>Address:</FormLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Address'
                                    className=' me-2'
                                    value={address}
                                    onChange={((e) => setAddress(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <button type='button' className='btn bg-light border px-4' onClick={((e) => handelUpdateContact(e.target))}>Submit</button>
                                {/* <button type='button' className='btn bg-light border px-4 ms-2' onClick={handleRefresh}>Resert</button> */}
                            </div>
                            {/* <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> */}
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
    </>
  )
}
