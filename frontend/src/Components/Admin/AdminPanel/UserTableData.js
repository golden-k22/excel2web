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


function UserTableData() {

  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {

    getUsers();

  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:4000/serve/admin_panel");
    if (response.status === 200) {
      setData(response.data)
      navigate(`${process.env.PUBLIC_URL}/admin_panel`)

    }
  };


  const deleteUser = async (id) => {
    // if (window.confirm("Are you sure to delete user")) {
    if (id === localStorage.getItem("user_id")) {
      toast.error("Cannot delete this user!", {
        position: "top-right",
      });
    } else {
      const response = await axios.delete(`http://localhost:4000/serve/delete_user/${id}`)
      toast.success(response.data);
      getUsers();
    }

    //  }
  }

  const deleteAllUsers = async () => {
    const logged_id = localStorage.getItem("user_id");
    const response = await axios.delete(`http://localhost:4000/serve/delete_all_users/${logged_id}`)
    toast.success(response.data);
    getUsers();
  }


  const editUser = async (id) => {

    if (id === localStorage.getItem("user_id")) {
      toast.error("Cannot edit this user!", {
        position: "top-right",
      });
    } else {
      navigate(`${process.env.PUBLIC_URL}/edit/${id}`);
    }
  }



  const blockUser = async (id) => {

    if (id === localStorage.getItem("user_id")) {
      toast.error("Cannot block this user!", {
        position: "top-right",
      });
    } else {
      const response = await axios.put(`http://localhost:4000/serve/block_user/${id}`)
      toast.success(response.data);
      getUsers();
    }
  }

  const unblockUser = async (id) => {
    // if (window.confirm("Are you sure to unblock user")) {
    const response = await axios.put(`http://localhost:4000/serve/unblock_user/${id}`)
    toast.success(response.data);
    getUsers();
    // }
  }

  return (
    <>
      {/* <Container> */}
      <div className="dataBox pt-5">
        <h2>User List</h2>
        <div className='d-flex'>
          <div className='col-7'></div>
          <div className='text-center  w-50 col-2'>
            <Link to={`${process.env.PUBLIC_URL}/add_user`}>
              <Button className='btn btn-success'>Add New </Button>
            </Link>
          </div>

        </div>
        <Table striped bordered hover className='mt-5 mx-auto text-center '>

          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th >Actions</th>
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
                    <td>{item.email}</td>
                    <td>

                      <ModalBtn item={item} delete={(id) => deleteUser(id)} title={"Delete User"} content={'Do you want to delete this User?'} />
                      {/* <Link to={`/delete/${item._id}`}>
                        <Button className='btn btn-danger' onClick={() => deleteUser(item._id)}><i className='fa fa-trash' aria-hidden="true"></i></Button>
                      </Link> */}

                      <Button className='btn btn-primary ms-2' onClick={() => editUser(item._id)}><i className='fa fa-edit'></i></Button>

                      {(!item.isBlocked) ?
                        //<Link to={`/block/${item._id}`}>
                        <Button className='btn btn-danger ms-2' onClick={() => blockUser(item._id)}>Block</Button>
                        //</Link> :
                        :
                        // <Link to={`/unblock/${item._id}`}>
                        <Button className='btn btn-success ms-2' onClick={() => unblockUser(item._id)}>Unblock</Button>
                        //</Link>
                      }

                    </td>


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

export default UserTableData;