import {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import FontAwesome from 'react-fontawesome';
import {Btn} from '../../AbstractElements'


function Add() {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descError, setDescError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.length < 1){
      setNameError('required')

    }else{
      setNameError('')      
    }

    if(description.length < 1){
      setDescError('required')
    }else{
      setDescError('')
    }
    if(name.length >= 1 && description.length >= 1){
      const worksheet_info = {
        "name": name,
        "description": description
      }
      localStorage.setItem('worksheet_info', JSON.stringify(worksheet_info));
      navigate(`${process.env.PUBLIC_URL}/employee_list`);
    }
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    var inputValue = e.target.value;
    setName(inputValue);    
  }

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    var inputValue = e.target.value;
    setDescription(inputValue);   
  }
  const backBtnHandler = () => {
    navigate(`${process.env.PUBLIC_URL}/manage_payroll`);
  }

  return (
    <>
    <form
        onSubmit={handleSubmit}        
        className="container"
        autoComplete="off"
      >
    <div className='private'>
      <div>
          <Btn onClick={backBtnHandler} style={{borderRadius:'5px', color:'white', fontSize:'18px', fontWeight:'bold'}} > <FontAwesome className='fa fa-chevron-left'/> Back</Btn>
        </div>
        <br></br>
        <h2>Add WorkSheet</h2>    
        <br></br>
        <div style={{fontSize: '24px'}} className='worksheet_name' >
            <h5>Worksheet Name* </h5>
            <div className='col-3 mt-3'>
              <input refs="name" className='form-control ' style={{borderRadius:'7px', borderColor:'#888888'}} value={name} onChange={handleNameChange}      
              ></input>
              <span style={{ color: "red", fontSize:'18px' }}>{nameError}</span>
            </div>
            
            <br></br>
        </div>
        <div style={{fontSize: '24px'}} className='worksheet_description'>
            <br></br>
            <h5>Description</h5>
            <br></br>
            <div className='row'>
                <div className='col-3'>
                    <input refs="description" className='form-control' style={{borderRadius:'7px', borderColor:'#888888'}} value={description} onChange={handleDescriptionChange}></input>
                    <span style={{ color: "red", fontSize:'18px' }}>{descError}</span>
                </div>
                <div className='col-2'>
                    <h4> English(CA)</h4>
                </div>
                <div className='col-7'></div>
            </div>
            <div className='row mt-3'>
                <div className='col-3'>
                    <input className='form-control' style={{borderRadius:'7px', borderColor:'#888888'}}></input>                    
                </div>
                <div className='col-2'>
                    <h4> French(CA)</h4>
                </div>
                <div className='col-7'></div>
            </div>
        </div>

        <div style={{float:'right'}}>
            <div>
                <Btn style={{borderRadius:'9px', color:'white', fontSize:'20px'}}>Next <FontAwesome className='fa fa-chevron-right' name='chevron-right'/></Btn>
            </div>            
        </div> 
      </div>
    </form>         
      <ToastContainer />      
    </>
  )
}

export default Add