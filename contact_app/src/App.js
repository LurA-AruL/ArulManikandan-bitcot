import React, { useEffect, useState } from 'react';
import AddContacts from './components/AddContacts';
import ViewContact from './components/ViewContact';
import { Form, FormControl, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [contact, setContact] = useState([]);
  const [query, setquery] = useState('');
  const [get_data, setGet_data] = useState([]);
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [showFilter, setshowFilter] = useState(false);


  // get restapi
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () =>{
    fetch("http://localhost:5000/users")
      .then((resp) => resp.json())
      .then((req) => {
        setGet_data(req);
      });
  }


  // delete

  const handleDelete = (e) => {
    let url = `http://localhost:5000/users/${e}`;
    console.log(e)
    fetch(url, {
      method: "DELETE",
      // body: JSON.stringify(send_data)
    }).then(resp => resp.json()).then(req => {
      console.log(req);
      setContact();
    });
  }

  // handleSeachData 

  const searchContact = async (e) => {
    e.preventDefault();
    try {
      const API_SEARCH = `http://localhost:5000/users`;
      const res = await fetch(API_SEARCH);
      const data = await res.json();
      console.log("dataaaa", data);
      setContact(data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const changeHandler = async (e) => {
    const API_SEARCH = `http://localhost:5000/users`;
    const res = await fetch(API_SEARCH);
    const data = await res.json();

    if (e.target.value.trim().length === 0) {
      setGet_data(data);
      setshowFilter(false);
    } else {
      setshowFilter(true);
      const filteredContacts = data.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilteredData(filteredContacts);
    }
  }

  const handleSelect =  (id) => {
    
    const selectdata = get_data.find(function (item) {
      return item.id == id;
    });
    setId(selectdata.id);
    setName(selectdata.name);
    setEmailId(selectdata.phoneNumber);
    setPhoneNumber(selectdata.emailId);
    setCity(selectdata.city);

  }

  const viewContact = (id) =>{
    const selectdata = get_data.find(function (item) {
      return item.id == id;
    });
    setName(selectdata.name);
    setEmailId(selectdata.phoneNumber);
    setPhoneNumber(selectdata.emailId);
    setCity(selectdata.city);
  }

  const handleUpdateUser = () => {
    let items = { name, emailId, phoneNumber, city, id };
    console.log(items);
    let url = `http://localhost:5000/users/${id}`;
    // console.log(e)
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(items)
    }).then(resp => resp.json()).then(req => {
      console.log(req);
      getContacts();
    });


  }
  return (
    <>
      <div className='w-50 ps-2 border m-2'>

        <AddContacts getContacts={getContacts} />
        <Form className="d-flex justify-content-center p-2" onSubmit={searchContact}>
          <FormControl
            type="search"
            placeholder='ContactList...'
            className='me-2 w-50'
            aria-label='search'
            name="query"
            value={query} onChange={(e)=>{ setquery(e.target.value);changeHandler(e)}}></FormControl>
          <Button variant="secondary" type="submit">search</Button>
        </Form>
        <div className='p-5'>
          <div>


            {contact.length > 0 ? (
              <div className='fulid-container'>
                <div className='container '>
                  <div className='grid'>

                    {get_data.map((mainData, ii) => mainData.name == query ?

                      <div className='row py-2' key={ii}>
                        <div className='col-2'>{mainData.id}</div>
                        <div className='col-7 d-flex align-items-center p-0 gap-2'>
                          <div><i class="bi bi-person-square fs-1"></i></div>
                          <div>
                            <p className='p-0 m-0'>{mainData.name}</p>
                            <p className='p-0 m-0'>{mainData.phoneNumber}</p>
                          </div>
                        </div>
                        <div className='col-1'><ViewContact key={ii} id={mainData.id} name={mainData.name} emailId={mainData.emailId} phoneNumber={mainData.phoneNumber} address={mainData.city} /></div>
                        <div className='col-1'><button className='btn' onClick={(() => handleDelete(mainData.id))}><i class="bi bi-trash"></i></button></div>
                        <div className='col-1'>
                          {/* <!-- Button trigger modal --> */}
                          <div className='outer-wrapper p-2'>
                            <button type="button" class="btn  " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(() => handleSelect(mainData.id))}><i class="bi bi-person-plus-fill ps-3"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      : query.trim().length == 0 ?

                        <div className='row py-2' key={ii}>
                          <div className='col-2'>{mainData.id}</div>
                          <div className='col-7 d-flex align-items-center p-0 gap-2'>
                            <div><i class="bi bi-person-square fs-1"></i></div>
                            <div>
                              <p className='p-0 m-0'>{mainData.name}</p>
                              <p className='p-0 m-0'>{mainData.phoneNumber}</p>
                            </div>
                          </div>
                          <div className='col-1'><ViewContact key={ii} id={mainData.id} name={mainData.name} emailId={mainData.emailId} phoneNumber={mainData.phoneNumber} address={mainData.city} /></div>
                          <div className='col-1'><button className='btn' onClick={(() => handleDelete(mainData.id))}><i class="bi bi-trash"></i></button></div>
                          <div className='col-1'>
                            {/* <!-- Button trigger modal --> */}
                            <div className='outer-wrapper'>
                              <button type="button" class="btn  " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(() => handleSelect(mainData.id))}><i class="bi bi-person-plus-fill ps-3"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        : null)}

                  </div>
                </div>
              </div>
            )
              :
              (

                <div className='container'>
                  {!showFilter ? get_data.map((data, index) => (
                    <div className='row py-2 border mt-1 px-2' key={index}>
                      
                      <div className='col-2 d-flex align-items-center'>{index + 1}</div>
                      <div className='col-7 d-flex align-items-center p-0 gap-2'>
                        <div><i class="bi bi-person-square fs-1"></i></div>
                        <div>
                          <p className='p-0 m-0'>{data.name}</p>
                          <p className='p-0 m-0'>{data.phoneNumber}</p>
                        </div>
                      </div>
                      <div className='col-1'>
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#viewContact" onClick={()=>viewContact(data.id)}>
                        <i class="bi bi-eye-fill"></i>
                      </button>
                        <ViewContact key={index} id={id} name={name} emailId={emailId} phoneNumber={phoneNumber} address={city} />
                        </div>
                      <div className='col-1'><button className='btn' onClick={(() => handleDelete(data.id))}><i class="bi bi-trash"></i></button></div>
                      <div className='col-1'>
                        {/* <!-- Button trigger modal --> */}
                        <div className='outer-wrapper'>
                          <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#update" onClick={(() => handleSelect(data.id))}><i class="bi bi-person-plus-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : null}

                  {showFilter ? filteredData.map((data, index) => (
                    <div className='row py-2 border mt-1 px-2' key={index}>
                      
                      <div className='col-2 d-flex align-items-center'>{index + 1}</div>
                      <div className='col-7 d-flex align-items-center p-0 gap-2'>
                        <div><i class="bi bi-person-square fs-1"></i></div>
                        <div>
                          <p className='p-0 m-0'>{data.name}</p>
                          <p className='p-0 m-0'>{data.phoneNumber}</p>
                        </div>
                      </div>
                      <div className='col-1'>
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#viewContact" onClick={()=>viewContact(data.id)}>
                        <i class="bi bi-eye-fill"></i>
                      </button>
                        <ViewContact key={index} id={id} name={name} emailId={emailId} phoneNumber={phoneNumber} address={city} />
                        </div>
                      <div className='col-1'><button className='btn' onClick={(() => handleDelete(data.id))}><i class="bi bi-trash"></i></button></div>
                      <div className='col-1'>
                        {/* <!-- Button trigger modal --> */}
                        <div className='outer-wrapper'>
                          <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#update" onClick={(() => handleSelect(data.id))}><i class="bi bi-person-plus-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )): null}
                </div>

              )
            }

          </div>
        </div>


        {/* <!-- Modal --> */}
        <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-secondary fs-3 " id="exampleModalLabel">Update Contact</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body border-0 ">
                <form onSubmit={(e => e.preventDefault())} className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                  <div className=''>
                    <div>Name:</div>
                    <input placeholder='Enter Your Name' className='p-1 rounded border-1 fs-6' type='text' value={name} required onChange={((e) => setName(e.target.value))} />
                  </div><div className=''>
                    <div>Email:</div>
                    <input placeholder='Enter Your Email' className='p-1 rounded border-1 fs-6' type='text' value={emailId} required onChange={((e) => setEmailId(e.target.value))} />
                  </div><div className=''>
                    <div>PhoneNumber:</div>
                    <input placeholder='Enter Your PhoneNumber' className='p-1 rounded border-1 fs-6' type='text' value={phoneNumber} required onChange={((e) => setPhoneNumber(e.target.value))} />
                  </div>
                  <div className=''>
                    <div>Address</div>
                    <input placeholder='Enter Your Address' className='p-1 rounded border-1 fs-6' type='text' value={city} required onChange={((e) => setCity(e.target.value))} />
                  </div>
                  <div class="d-flex justify-content-start gap-4">
                    <button type="button" class="btn btn-primary" onClick={handleUpdateUser}>update</button>
                    <button type="reset" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                  </div> 
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default App;
