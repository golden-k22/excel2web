import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import { Row } from 'reactstrap'

const initialState = {
  first_name: "",
  last_name: "",
  email: ""
}

function EditUser() {

  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const { first_name, last_name, email } = state
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id])

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:4000/serve/edit/${id}`);
    if (response.status === 200) {
      
      setState({ ...response.data })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateUser(state, id)
    }

  }

  const updateUser = async (data, id) => {
    try {

      const response = await axios.post(`http://localhost:4000/serve/update/${id}`, data)
     

      if (response) {
        if (response.data.errors) {
          const { name, email } = response.data.errors;
          if (name) generateError(name)
          else if (email) generateError(email)
        } else {
          navigate(`${process.env.PUBLIC_URL}/admin_panel`)
        }
      }


    } catch (error) {
      console.log(error);
    }

  }


  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });


  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const onCancel=()=>{
    navigate(`${process.env.PUBLIC_URL}/admin_panel`);
  }

  return (
    <div className="page">
      <div className='container'>
        <h2>Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name='first_name'
              className="form-control mt-1"
              placeholder='First Name'
              onChange={handleInputChange}
              value={first_name}
            />
          </div>
          <div>
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              name='last_name'
              className="form-control mt-1"
              placeholder='Last Name'
              onChange={handleInputChange}
              value={last_name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              className="form-control mt-1"
              placeholder='Email'
              onChange={handleInputChange}
              value={email}
            />
          </div>
          <Row>
              <div className="col-6">
              <button type='submit' className="form-control mt-3 btn-secondary" style={{color:'#ffffff'}}>Update</button>
              </div>
              <div className="col-6">
                <button onClick={onCancel} className="form-control mt-3 btn-danger">Cancel</button>
              </div>
          </Row>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditUser
