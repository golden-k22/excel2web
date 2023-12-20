import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import {BasicCardData} from "../../Data/BasicCard";
import FontAwesome from 'react-fontawesome';
import { Table } from 'react-bootstrap';
import ModalBtn from "../Admin/AdminPanel/ModalBtn";
import { Btn, P } from "../../AbstractElements";





function Manage() {
  const navigate = useNavigate();  
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const user_id=localStorage.getItem("user_id");
  const company_name = localStorage.getItem('company_code');

  var CardData = '';
  var id = ''
  for (var i = 0; i < BasicCardData.length; i++){
    if(BasicCardData[i].code.includes(company_name)){
      CardData = BasicCardData[i];
      id = i;
    }
  }
 
  const getWorksheets = async () => {
    const response = await axios.get("http://localhost:4000/serve/worksheets/" + user_id + "?company_code=" + company_name);
    if (response.status === 200) {   
      setData(response.data) 
      setFilter(response.data)  
    }   
  };
  
  useEffect(() => {    
        getWorksheets(); 
        
  }, []);

  const requestSearch = (searchedVal) => {
    
    const filteredRows = data.filter((row) => {
      return row.ws_name.toString().toLowerCase().includes(searchedVal.toString());
    });
    if(searchedVal.length < 1){      
      setFilter(data);
    }else {
      setFilter(filteredRows)
    }
  }

  const deleteWorksheet = async(id) => {
    const response = await axios.delete(`http://localhost:4000/serve/delete_worksheet/${id}`)    
    getWorksheets()
    toast.success(response.data);
  }

  const onAdd=() => {
    navigate(`${process.env.PUBLIC_URL}/add_worksheet`);
  }

  const nameClickHandler = (item) => {
    localStorage.setItem('ws_id', item._id)
    navigate(`${process.env.PUBLIC_URL}/main_worksheet/${item._id}`);
  }

  const backBtnHandler = () => {
    navigate(`${process.env.PUBLIC_URL}/home`);
  }

  return (
    <>
      <div className='private'>
        <div>
          <Btn onClick={backBtnHandler} style={{borderRadius:'5px', backgroundColor:'red', color:'white', fontSize:'18px', fontWeight:'bold'}} > <FontAwesome className='fa fa-chevron-left'/> Back </Btn>
        </div>
        <br></br>
        <h2>Manage Regular Payroll</h2>
        <br></br>
        <h5>{CardData.mode}</h5>
        <br></br>
        <h5>  Pay Date/Period</h5>
        <h5>  {CardData.pay_date}</h5>
        <h5>  Pay Group {id}</h5>
        <h5>  {CardData.period}</h5>
        <br></br>
        <div className='row' style={{fontSize:'20px'}}>
            <div className='col-2' onClick={onAdd}>
                <FontAwesome className = 'fa-plus-circle' name='plus-circle'/> &nbsp;
                Add worksheet
            </div>
            
            <div className='col search' style={{textAlign: 'right'}}>
              
                <div style={{fontSize:'18px', fontStyle:'oblique'}}>
                    <input type="text" placeholder=" Search Employee by Fil...  " onChange={(e) => requestSearch(e.target.value)}/>
                    <button type="button">
                        <FontAwesome className="fa-search" name='search'/>
                    </button>
                </div>
            </div>       
 
        </div>
        <br></br>
        <div className='table' style={{fontSize: '18px'}}>
        <Table striped bordered hover className='mt-5 w-75 mx-auto text-center '>
          <thead>
            <tr>             
              <th>Name &nbsp; <FontAwesome className="fa-sort" name="sort"/></th>
              <th>Status &nbsp; <FontAwesome className="fa-sort" name="sort"/></th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filter.map((item, index) => {
                return (
                  <tr key={index}>                   
                    <td onClick={() => nameClickHandler(item)}>{item.ws_name}</td>
                    <td><FontAwesome className='fa-check-circle' name='check-circle'/> &nbsp;In balance</td>
                    <ModalBtn item={item} delete={(id)=>deleteWorksheet(id)}  title={"Delete Worksheet"} content={'Do you want to delete this worksheet?'}/>
                   
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </div>
        
      </div>
      <ToastContainer />
    </>
  )
}

export default Manage