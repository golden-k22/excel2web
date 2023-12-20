import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import {Col, Card, CardBody, CardFooter} from "reactstrap";
import {BasicCardData} from "../../Data/BasicCard";
import { Btn } from "../../AbstractElements";
import HeadingCommon from '../../Common/HeadingCommon';


function Home() {
  const navigate = useNavigate();
  const company_codes = ['4JT', '7M5', '2RY']

  const onSubmit = (e) => {
    var id = e.target.id - 1;
    localStorage.setItem('company_code', company_codes[id])
    navigate(`${process.env.PUBLIC_URL}/manage_payroll`);
  }

  const toEmployeeListHandler = (e) => {
    navigate(`${process.env.PUBLIC_URL}/all_employee_list`);
  }

  return (
    <>
      <div className='private'>
        <h2>User Dashboard</h2>    
        <div className='row'>
          <div className='col-10'>
          {BasicCardData.map((item) => (
          <Col sm="12" xl="6" key={item.id}>
            <Card className="">
              <HeadingCommon               
                Heading={item.code}
              />
              <CardBody              
            >    
            <div className="row">
              <div className="col">
                <h6 className="mb-0">{item.mode}</h6>
                <br></br>
                <h5 className="mb-0">Pay Date/Period</h5>
                <h5 className="mb-0">{item.pay_date}</h5>
                <h6 className="mb-0">{item.period}</h6>
              </div>
              <div className="col" style={{textAlign:'center', fontSize: '20px'}}>
                <Btn id={item.id} style={{backgroundColor: 'darkblue', color:'white', borderRadius:'7px'}} onClick={onSubmit} >Manage Payroll</Btn>
              </div>              
            </div>     
            </CardBody>
            <CardFooter              
            >
            </CardFooter>
            <br></br>
            </Card>   
          </Col>
        ))}

          </div>
          <div className='col-2' >
            <Btn onClick={toEmployeeListHandler} style={{ borderRadius: '7px', fontSize:'18px', color:'white'}}>To Employee List</Btn>
            
          </div>
        </div> 
        
      </div>
      <ToastContainer />
    </>
  )
}

export default Home