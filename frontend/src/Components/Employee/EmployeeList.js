import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { Table, Button } from 'react-bootstrap';
import { Btn } from '../../AbstractElements'



function EmployeeList() {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  const [searchData, setSearchData] = useState(data);
  const [checkStatus, setCheckStatus] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const checkedList = [];

  useEffect(() => {    
    getEmployeeList();     
  }, []);

  const getEmployeeList = async () => {
    const company_name = localStorage.getItem('company_code');
    const response = await axios.get("http://localhost:4000/serve/employee_list?company_code=" + company_name);
    if (response.status === 200) { 
      setData(response.data);  
      setSearchData(response.data) 
      localStorage.setItem('allEmployeeList', JSON.stringify(response.data)) 
    }    
  };

  const onSubmit=() => {       
    if(checkedList.length > 0){
      setSearchKey('')
      localStorage.setItem('employeeList', JSON.stringify(checkedList))
      
      navigate(`${process.env.PUBLIC_URL}/main_worksheet`);
    } else{
      generateError('Please select employees')
    }
  }  

  const generateError = (err) =>
  toast.info(err, {
    position: "top-center",
  });

  const handleChange=(e) => {
    
    if(e.target.value === "status is active"){
      setFilterStatus(true)
      const filteredData = data.filter(item => item.status.includes('Active'))
      const searchedData = filteredData.filter(item => (item.first_name + ', ' + item.last_name).toLowerCase().includes(searchKey))      
      setSearchData(searchedData)
      
    }else{    
      setFilterStatus(false)  
      setSearchData(data.filter(item => (item.first_name + ', ' + item.last_name).toLowerCase().includes(searchKey)));      
    }

  }

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value)
    var filteredData = data
    if(filterStatus){
      filteredData = data.filter(item => item.status.toLowerCase().includes('active'))
    }    
    setSearchData(filteredData.filter(item => (item.first_name + ', ' + item.last_name).toLowerCase().includes(e.target.value)));
  }

  const handleCheck = (e) => {
    setCheckStatus(!checkStatus)
  }

  const handleCheckList = (e) => {
    if(e.target.checked){
      checkedList.push(data[e.target.id])
    }else{
      checkedList.pop(data[e.target.id])
    }       
  }
  const backBtnHandler = () => {
    navigate(`${process.env.PUBLIC_URL}/add_worksheet`);
  }

  return (
    <>
      <div className='private'>
      <div>
          <Btn onClick={backBtnHandler} style={{borderRadius:'5px', color:'white', fontSize:'18px', fontWeight:'bold'}} ><FontAwesome className='fa-chevron-left'/> Back</Btn>
        </div>
        <br></br>
        <h2>View Employee List</h2>     
        <br></br>
        <div className='row' style={{fontSize:'20px'}}>
            <div className='col-2'>
            <div className="input-group mb-3">
                <h5> Select List &nbsp;</h5>
                <select className="form-select" onChange={handleChange} >
                    <option defaultValue value="all employees">all employees</option>
                    <option value="status is active">status is active</option>
                </select>
            </div>                
            </div>            
            <div className='col search' style={{textAlign: 'right'}}>
              
                <div style={{fontSize:'18px', fontStyle:'oblique'}}>
                    <input type="text" placeholder=" Search by name or posit...  " onChange={handleSearchChange}/>
                    <button type="button">
                        <FontAwesome className="fa-search" name='search'/>
                    </button>
                </div>
            </div>   
        </div>
        <br></br>
        <div style={{fontSize:'24px'}}>
            <FontAwesome className='fa-filter' name='filter'>Filters</FontAwesome>
        </div>
        <div>
        <Table striped bordered hover className='mt-5 w-75 mx-auto text-center '>
          <thead>
            <tr>                
              <th></th>       
              <th>Name</th>
              <th>Salary</th>
              <th>File #</th>
              <th>Status</th>              
            </tr>
          </thead>
          <tbody>
            {
              searchData.map((item, index) => {               
                return (
                  <tr key={index}>                     
                    <td><input type='checkbox' id={index} onChange={handleCheckList}></input></td>                                     
                    <td>{item.first_name}, {item.last_name}</td>
                    <td>{item.annual_salary_rate}</td>
                    <td>{item.file_number}</td>
                    <td>{item.status}</td>                    
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </div>
        <br></br>
        <div style={{float:'right'}}>
            <div>
                <Btn onClick={() => onSubmit()} color='#0035ff' style={{backgroundColor:'#0035ff', borderRadius:'9px', color:'white', fontSize:'20px'}}>Submit</Btn>
            </div>
            
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default EmployeeList