import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle,Container,Row,Col } from 'react-bootstrap'

export default function ViewContacts(props) {
    
    // modal usestate
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    // view contact details

    const viewContactDetails = () => {
        props.spinner();
        setTimeout(() => {
            handleOpen();            
        }, 500); 
    }

  return (
    <>
        <i className="bi bi-eye-fill CreateIcon-eye" onClick={viewContactDetails}></i>
        
        {/* modal view */}

        <Modal show={show} onHide={handleClose}>
           <ModalHeader closeButton>
                <ModalTitle className='text-secondary'>
                    Hi it's Me <span className='text-primary'>{props.userName.toUpperCase()}</span>
                </ModalTitle>
           </ModalHeader>
           <ModalBody>
           <Container>
                <Row className='border-bottom p-1'>
                    <Col className='text-end fw-bold'>Name:</Col>
                    <Col className=" text-break ">{props.userName}</Col>
                </Row>
                <Row className='border-bottom p-1'>
                    <Col className='text-end fw-bold'>Email:</Col>
                    <Col className=" text-break ">{props.userEmail}</Col>
                </Row>
                <Row className='border-bottom p-1'>
                    <Col className='text-end fw-bold'>Phone Number:</Col>
                    <Col className=" text-break ">{props.userPhoneNo}</Col>
                </Row>
                <Row className='pb-1'>
                    <Col className='text-end fw-bold'>Address:</Col>
                    <Col className=" text-break">{props.userAddress}</Col>
                </Row>
                </Container>
           </ModalBody>
        </Modal>
    </>
  )
}
