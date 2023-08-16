import React, { useEffect } from 'react'

export default function DeleteContacts(props) {

    // handle Delete Contact
    const handleDelteContact = (id) => {
        setTimeout(() => {
            fetch(`http://localhost:5000/user_Data/${id}`,{
                method:"DELETE",
            })
            .then(resq => resq.json())
            .then(response => {
              console.log(response);
              props.fetchGetData();
            }) 
        }, 500);
        props.spinner();
    }
  return (
    <i className="bi bi-trash CreateIcon-trash" onClick={(() => handleDelteContact(props.id))}></i>
  )
}
