import React from 'react'

export default function ViewContact(props) {
  return (
    <>


      {/* <!-- Button trigger modal --> */}
     

      {/* <!-- Modal --> */}
      <div class="modal fade" id="viewContact" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">View Contact</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className='row'>
                <div className='col-6  d-flex justify-content-end'>Name :</div>
                <div className='col-6 '>{props.name}</div>
                <div className='col-6  d-flex justify-content-end'>Email :</div>
                <div className='col-6 '>{props.emailId}</div>
                <div className='col-6  d-flex justify-content-end'>PhoneNumber :</div>
                <div className='col-6 '>{props.phoneNumber}</div>
                <div className='col-6  d-flex justify-content-end'>Address :</div>
                <div className='col-6 '>{props.address}</div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
