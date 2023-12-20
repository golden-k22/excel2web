import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ModalBtn from "./ModalBtn";
import AllDeleteModalBtn from "./AllDeleteModalBtn";


function EmployeeTableData() {

  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {

    getEmployees();

  }, []);



  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:4000/serve/employee_list");
    if (response.status === 200) {
      setData(response.data)
      if(getCookie("token"))
        navigate(`${process.env.PUBLIC_URL}/admin_panel/employee_list`)
      else
        navigate(`${process.env.PUBLIC_URL}/all_employee_list`)

    }
  };


  const deleteEmployee = async (id) => {
    // if (window.confirm("Are you sure to delete user")) {
    const response = await axios.delete(`http://localhost:4000/serve/delete_employee/${id}`)
    toast.success(response.data);
    getEmployees();

    //  }
  }

  const deleteAllEmployees = async () => {
    const logged_id = localStorage.getItem("user_id");
    const response = await axios.delete(`http://localhost:4000/serve/delete_all_employees/${logged_id}`)
    toast.success(response.data);
    getEmployees();
  }


  return (
    <>
      {/* <Container> */}
      <div className="dataBox pt-5">
        <h2>View Employee List</h2>
        {getCookie("token") &&
          <div className='d-flex'>
            <div className='col-8'></div>
            <div className='text-center col-1'>
              <Link to={`${process.env.PUBLIC_URL}/add_employee`}>
                <Button className='btn btn-success'>Add New </Button>
              </Link>
            </div>
            <div className='text-center col-2'>
              <AllDeleteModalBtn delete={() => deleteAllEmployees()} title={"Delete All Employees"} content={'Do you want to delete All Employees?'} />
            </div>
          </div>
        }
        {getCookie("jwt") &&
          <div className='d-flex'>
            <div className='col-10'></div>
            <div className='text-center col-2'>
              <Link to={`${process.env.PUBLIC_URL}/home`}>
                <Button className='btn btn-secondary'>To Home</Button>
              </Link>
            </div>
          </div>
        }

        <Table striped bordered hover className='mt-5 w-75 mx-auto text-center '>

          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Company code</th>
              <th>Status</th>
              <th>Pay type</th>
              <th>File</th>
              <th>Residence Province</th>
              <th>Start</th>
              <th>Location</th>
              <th>Employement Province</th>
              <th>Federal Tax</th>
              <th>Provice Tax</th>
              <th>Additional Tax</th>
              <th>El Rate</th>
              {getCookie("token") &&
                <th >Actions</th>
              }

            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.age}</td>
                    <td>{item.annual_salary_rate}</td>
                    <td>{item.company_code}</td>
                    <td>{item.status}</td>
                    <td>{item.pay_type}</td>
                    <td>{item.file_number}</td>
                    <td>{item.residence_province}</td>
                    <td>{item.start_date}</td>
                    <td>{item.location}</td>
                    <td>{item.employment_province}</td>
                    <td>{item.federal_tax}</td>
                    <td>{item.provincial_tax}</td>
                    <td>{item.additional_tax}</td>
                    <td>{item.el_rate}</td>
                    {getCookie("token") &&
                      <td>

                        <ModalBtn item={item} delete={(id) => deleteEmployee(id)} title={"Delete Employee"} content={'Do you want to delete this Employee?'} />

                        {/* <Button className='btn btn-primary ms-2' onClick={() => editUser(item._id)}><i className='fa fa-edit'></i></Button> */}


                      </td>
                    }


                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      {/* </Container> */}
      <ToastContainer />
    </>
  )
}

export default EmployeeTableData;