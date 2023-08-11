import React, { useState, useEffect } from 'react'

export default function AddContacts({getContacts}) {

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [get_data, setGet_data] = useState([]);


  // get restapi
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((resp) => resp.json())
      .then((req) => {
        // console.log(req);
        setGet_data(req);
      });
  }, []);
  // post restApi
  const handleSubmit = () => {
    let send_data = { name, city, emailId, phoneNumber }
    if (name !== "" && city !== "") {
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(send_data)
      }).then(resp => resp.json()).then(req => {
        console.log(req);
        getContacts();
      });
      setCity("");
      setName("");
      setEmailId("");
      setPhoneNumber("");
    }

  };


  //   resert
  const handleResert = () =>{
    setCity("");
      setName("");
      setEmailId("");
      setPhoneNumber("");
  }
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <div className='outer-wrapper p-2'>
        <button type="button" class="btn btn-primary w-100 fs-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
          All Contacts <i class="bi bi-person-plus-fill ps-3"></i>
        </button>
      </div>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-secondary fs-3 " id="exampleModalLabel">Add Contact</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body border-0 ">
              <form onSubmit={(e => e.preventDefault())} className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                <div className=''>
                  <div>Name:</div>
                  <input placeholder='Enter Your Name' className='p-1 rounded border-1 fs-6' type='text' value={name} required onChange={((e) => setName(e.target.value))} />
                </div><div className=''>
                  <div>Email:</div>
                  <input placeholder='Enter Your Email' className='p-1 rounded border-1 fs-6' type='email' value={emailId} required onChange={((e) => setEmailId(e.target.value))} />
                </div><div className=''>
                  <div>PhoneNumber:</div>
                  <input placeholder='Enter Your PhoneNumber' className='p-1 rounded border-1 fs-6' type='text' value={phoneNumber} required onChange={((e) => setPhoneNumber(e.target.value))} />
                </div>
                <div className=''>
                  <div>Address</div>
                  <input placeholder='Enter Your Address' className='p-1 rounded border-1 fs-6' type='text' value={city} required onChange={((e) => setCity(e.target.value))} />
                </div>
                <div class="d-flex justify-content-start gap-4">
                  <button type="button" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                  <button type="button" class="btn btn-dark"  onClick={handleResert}>Resert</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

    </>
  )
}
