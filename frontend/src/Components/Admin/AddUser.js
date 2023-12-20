import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Row } from 'reactstrap'

function AddUser() {

    const navigate = useNavigate();
    const {register , handleSubmit, formState: { errors }} = useForm();
    
    
    const generateError = (err) =>
        toast.error(err, {
          position: "top-center",
        });  
    
    
    const onSubmit = async (values) => {
      
    
      try {
        const { data } = await axios.post("http://localhost:4000/serve/register", {
          ...values,
        }, {
          withCredentials: true,
        })
          
        if (data) {
          if (data.errors) {
            const { name, email, password } = data.errors;
            if (name) generateError(name)
            else if (email) generateError(email)
            else if (password) generateError(password)
          } else {
           
            navigate(`${process.env.PUBLIC_URL}/admin_panel`);
            toast.success("Added Successfully...");
          }
        }
    
      } catch (error) {
        console.log(error);
      }    
    }

    const onCancel=()=>{
      navigate(`${process.env.PUBLIC_URL}/admin_panel`);
    }
    

      return (
        <div className="page">
        <div className='container'>
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username">First Name</label>
              <input
                type="text"
                name='last_name'
                className="form-control mt-1"
                placeholder='First Name'
                {...register("first_name",{ required: "First Name is required",maxLength:{
                  value:20,
                  message:"First Name cannot exceed more than 20 characters"
                } })}
                 />
            {errors.first_name && <p style={{color: "red"}}>{errors.first_name.message}</p>}
            </div>
            <div>
              <label htmlFor="username">Last Name</label>
              <input
                type="text"
                name='last_name'
                className="form-control mt-1"
                placeholder='Last Name'
                {...register("last_name",{ required: "Last Name is required",maxLength:{
                  value:20,
                  message:"Last Name cannot exceed more than 20 characters"
                } })}
                 />
            {errors.last_name && <p style={{color: "red"}}>{errors.last_name.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name='email'
                className="form-control mt-1"
                placeholder='Email'
                {...register("email",{ required: "Email is required", pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:"Enter valid email"}})}
                 />
            {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password" 
                name='password'
                className="form-control mt-1"
                placeholder='Password' 
                {...register("password",{ required: "Password is required",
              minLength:{
                value:4,
                message:"Password must be more than 4 characters"
                
              },
              maxLength:{
                value:8,
                message:"Password cannot exceed more than 8 characters"
              },
              })}
                />
            {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
            </div>
            
            <Row>
              <div className="col-6">
                <button type='submit' className="form-control mt-3 btn-success">Add</button>
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

export default AddUser











// return (
//     <div className="page">
//     <div className='container'>
//       <h2>Add New User</h2>
//       <form >
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             name='name'
//             placeholder='Name'
//              />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name='email'
//             placeholder='Email'
//              />
//         </div>
//         <div>
//           <label htmlFor="email">Password</label>
//           <input
//             type="password"
//             name='password'
//             placeholder='Password'
//              />
//         </div>
        
//         <button type='submit' style={{backgroundColor:"green"}}>Update</button>
//       </form>
//       {/* <ToastContainer /> */}
//     </div>
//     </div>
//   )