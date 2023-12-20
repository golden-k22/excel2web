import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Row } from 'reactstrap'

function AddEmployee() {

    const navigate = useNavigate();
    const {register , handleSubmit, formState: { errors }} = useForm();
    
    
    const generateError = (err) =>
        toast.error(err, {
          position: "top-center",
        });  
    
    
    const onSubmit = async (values) => {    
      try {
        const { data } = await axios.post("http://localhost:4000/serve/add_employee", {
          ...values,
        }, {
          withCredentials: true,
        })
          
        if (data) {
          if (data.errors) {
            generateError(data.errors)
          } else { 
            if(data.created==true){
              navigate(`${process.env.PUBLIC_URL}/admin_panel/employee_list`);
              toast.success("Added Successfully...");
            }else{
              generateError("Failed...")
            }   
            
          }
        }
    
      } catch (error) {
        console.log(error);
      }    
    }

    const onCancel=()=>{
      navigate(`${process.env.PUBLIC_URL}/admin_panel/employee_list`);
    }
    

      return (
        <div className="page">
        <div className='container'>
          <h2>Add New Employee</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name='first_name'
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
              <label htmlFor="last_name">Last Name</label>
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
              <label htmlFor="age">Age</label>
              <input
                type="age"
                name='age'
                className="form-control mt-1"
                placeholder='Age'
                {...register("age",{ required: "Age is required", pattern:{value:/^[0-9.]+$/i, message:"Enter valid Age"}})}
                 />
            {errors.age && <p style={{color: "red"}}>{errors.age.message}</p>}
            </div>
            <div>
              <label htmlFor="salary">Salary</label>
              <input
                type="salary"
                name='salary'
                className="form-control mt-1"
                placeholder='Salary'
                {...register("salary",{ required: "Salary is required", pattern:{value:/^[0-9.]+$/i, message:"Enter valid Salary"}})}
                 />
            {errors.salary && <p style={{color: "red"}}>{errors.salary.message}</p>}
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

export default AddEmployee











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