
import React, { useEffect, useState } from 'react'
import ViewContacts from './ViewContacts';
import UpdateContacts from './UpdateContacts';
import DeleteContacts from './DeleteContacts';
import { Form, FormControl, FormLabel, Modal, ModalBody, ModalHeader, ModalTitle,Spinner } from 'react-bootstrap'

export default function CreateContact() {
    // UserContact useState
    // const [id,setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoNumber, setPhoNumber] = useState("");
    const [address, setAddress] = useState("");

    // searchList usestate
    const [searchList,setSearchList] = useState("");

    // search condition
    // const [searchCon,setSearchCon] = useState(false);

    // const handlesearchConClose = () => setSearchCon(false);
    // const handlesearchConClose = () => setSearchCon(true);

    // spinner use usestate
    const [spinShow,setSpinShow] = useState(false);

    const handleCloseSpin = () => setSpinShow(false);
    const handleOpenSpin = () => setSpinShow(true);
    // fetch data values
    const [userData,setUserData] = useState([]);

    // modal usestate
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true);

    let ApiData = "http://localhost:5000/user_Data" ;

    useEffect(() => {
    //    setInterval(() => {
        return fetchGetData();
    //    }, 1000);
    },[]);

    // api http

    // get Api fetch method
    function fetchGetData() {
        fetch(ApiData)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.length);
            setUserData(data);
        })
    } 

    //  post api data value
    const handleSentData = () => {
        let sentData = {name,email,phoNumber,address};
        let flag = false;
        // userData.map((checkContact) => {
            if(phoNumber.trim().length == 10 && (name.trim().length !== 0 && address.trim().length !== 0)){
                    flag = true;
            }else{
                alert("invaild")   
            }
        // })
        if(flag)
        {
            fetch(ApiData, {
                method:"POST",
                headers:{
                    "Accept" : "application/json",
                    "Content-type":"application/json"
                },
                body: JSON.stringify(sentData)
            })
            .then((resq) => resq.json())
            .then((resp) => {
                console.log(resp);
                fetchGetData();
            })
            handleRefresh();
            // handleClose();
            

        }
        
    }

    // HandaleSubmit 

    const HandaleSubmit = () => {
        console.log(name);
        handleSentData();
        
    }

    // refesh input tags

    const handleRefresh = () => {
        setAddress("");
        setEmail("");
        // setId("");
        setName("");
        setPhoNumber("");
    }

    // spiner function
    function spinnerBtn() {
       setTimeout(() => {
        handleCloseSpin();
       }, 500);
       handleOpenSpin();
      }

    //   spinner create Contact
    function spinCreateBtn() {
        setTimeout(() => {
            handleShow();
            handleCloseSpin();
        }, 500);
        handleOpenSpin();
       }

    //    SearchList function

    const handleSearchList = (e) => {
        setSearchList(e);
    }

    return (
        <div className=' fluid-container  px-2 pb-3 border bg-light  shadow rounded-1  col-12 col-lg-8 col-xl-6'>
            <div className='container '>
            {/* modal show button */}
                <button type='button' className='btn w-100 bg-primary text-white fs-4 fw-bold px-5 mt-2'  >
                    All Contacts <i className="bi bi-person-plus-fill fs-4 ps-3 CreateIcon" onClick={spinCreateBtn}></i>
                </button>
            {/* Search Button  */}
                <Form onChange={((e) => e.preventDefault())} className='mt-2'>
                    <FormControl 
                    type='search'
                    placeholder='search name or phoneNo'
                    className='w-50 mx-auto'
                    value={searchList}
                    onChange={((e) => handleSearchList(e.target.value))}
                    />
                </Form>
            {/* modal ui components*/}
                <Modal show={show} onHide={handleClose}>
                   <ModalHeader closeButton>
                        <ModalTitle className='text-secondary fw-bold'>
                         Create Contact
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={((e) => e.preventDefault())} className=' d-flex flex-column  gap-2'>
                            <div className='form-field'>
                                <FormLabel className="label">Name:</FormLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Enter Name '
                                    className='me-2'
                                    value={name}
                                    onChange={((e) => setName(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <FormLabel className="label">Email:</FormLabel>
                                <FormControl
                                    type='email'
                                    placeholder='Enter Email Id'
                                    className='me-2'
                                    value={email}
                                    onChange={((e) => setEmail(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <FormLabel className="label">Phone:</FormLabel>
                                <FormControl
                                    type='number'
                                    placeholder='Phone Number'
                                    className='me-2'
                                    value={phoNumber}
                                    onChange={((e) => setPhoNumber(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <FormLabel className="label">Address:</FormLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Address'
                                    className=' me-2'
                                    value={address}
                                    onChange={((e) => setAddress(e.target.value))}
                                />
                            </div>
                            <div className='form-field'>
                                <button type='button' className='btn bg-light border px-4' onClick={HandaleSubmit}>Submit</button>
                                <button type='button' className='btn bg-light border px-4 ms-2' onClick={handleRefresh}>Reset</button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
             {/* spinner modal */}
                
             <Modal show={spinShow} onHide={handleCloseSpin} className='d-flex'>
                    <ModalBody>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                    </ModalBody>
                </Modal>
            {/* display user contact */}
            <div className='display_Session mt-2'>
                {
                userData.map((eventData, index) => (
                    searchList.length > 0 ? 
                        
                        <div key={index} className='container border-0 mt-1'>
                            { eventData.name.toLowerCase().match(searchList.toLocaleLowerCase()) || eventData.phoNumber.match(searchList) ?  
                             <div className='row '>
                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                    {index+1}
                                </div>
                                <div className='col-6 d-flex gap-2 align-items-center'>
                                    {/* <div className='row'> */}
                                        <div className='text-center '>
                                            <i className="bi bi-person-square fs-1 "></i>
                                        </div>
                                        <div className=''>
                                            <p className='p-0 m-0 userNameFont'>{eventData.name}</p>
                                            <p className='p-0 m-0 userNameFont'>{eventData.phoNumber}</p>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <div className='col-4 d-flex justify-content-around align-items-center'>
                                    <div className='icons_list_wrapper'>
                                        <ViewContacts  key={index} 
                                            userId={index} 
                                            userName={eventData.name}
                                            userEmail={eventData.email}
                                            userPhoneNo={eventData.phoNumber}
                                            userAddress= {eventData.address}
                                            spinner={spinnerBtn}
                                            />
                                        </div>
                                    <div className='icons_list_wrapper'>
                                        <UpdateContacts  key={index}
                                         id={eventData.id} 
                                         Index_id={index}
                                         spinner={spinnerBtn}
                                         fetchGetData={fetchGetData}
                                         />
                                    </div>
                                    <div className='icons_list_wrapper'>
                                        <DeleteContacts  key={index}
                                         id={eventData.id}
                                         spinner={spinnerBtn}
                                         fetchGetData={fetchGetData}
                                         />
                                    </div>
                                </div>
                            </div>  : 
                            null
                            }                            
                        </div>
                     : 
                        <div key={index} className='container border mt-1'> 
                             <div className='row '>
                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                    {index+1}
                                </div>
                                <div className='col-6 d-flex gap-2 align-items-center'>
                                    {/* <div className='row'> */}
                                        <div className='text-center '>
                                            <i className="bi bi-person-square fs-1"></i>
                                        </div>
                                        <div className=''>
                                            <p className='p-0 m-0 userNameFont'>{eventData.name}</p>
                                            <p className='p-0 m-0 userNameFont'>{eventData.phoNumber}</p>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <div className='col-4 d-flex justify-content-around align-items-center'>
                                    <div className='icons_list_wrapper'>
                                        <ViewContacts  key={index} 
                                            userId={index} 
                                            userName={eventData.name}
                                            userEmail={eventData.email}
                                            userPhoneNo={eventData.phoNumber}
                                            userAddress= {eventData.address}
                                            spinner={spinnerBtn}
                                            />
                                        </div>
                                    <div className='icons_list_wrapper'>
                                        <UpdateContacts  key={index}
                                         id={eventData.id} 
                                         Index_id={index}
                                         spinner={spinnerBtn}
                                         fetchGetData={fetchGetData}
                                         />
                                    </div>
                                    <div className='icons_list_wrapper'>
                                        <DeleteContacts  key={index}
                                         id={eventData.id}
                                         spinner={spinnerBtn}
                                         fetchGetData={fetchGetData}
                                         />
                                    </div>
                                </div>
                            </div>
                                                       
                        </div>
                    )) 
                }  
            </div>
        </div>
    )
}
