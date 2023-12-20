import { useNavigate } from "react-router-dom";
import { Btn, H4, H6 } from "../AbstractElements";
import { useState ,useEffect} from "react";
import { useCookies } from 'react-cookie';
import { FormGroup, Input, Label } from "reactstrap";
import {ToastContainer, toast } from "react-toastify";
import {  Login, LoginDetails, Password, RememberMe, YourName } from "../Constant";
import axios from 'axios'
import { AnyAaaaRecord } from "dns";

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  
  const generateError = (err:any) =>{
    toast.error(err, {
      position: "top-right",
    });
  }
  
  function getCookie(cname:any) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      
      const { data } = await axios.post("http://localhost:4000/serve/", {
        ...values,
      }, {
        withCredentials: true,
      })

      if (data) {

        if (data.errors) {
          const { email, password } = data.errors;
          generateError(email);

        } else {
          if (data.value) {
            localStorage.setItem("login", JSON.stringify(true));
            localStorage.setItem("user_id", data.user._id);
            localStorage.setItem("user_f_name", data.user.first_name);
            localStorage.setItem("user_l_name", data.user.last_name);
            navigate(`${process.env.PUBLIC_URL}/admin_panel`);        
            toast.success("Login Success as Administrator...!");
          }else{
            localStorage.setItem("login", JSON.stringify(true));
            localStorage.setItem("user_id", data.user._id);
            localStorage.setItem("user_f_name", data.user.first_name);
            localStorage.setItem("user_l_name", data.user.last_name);
            navigate(`${process.env.PUBLIC_URL}/home`);        
            toast.success("Login Success...!");
          }
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     console.log("---------effect1-------",document.cookie);
  //     // if (getCookie("jwt")) {
  //     //   navigate("/admin_panel");
  //     //   console.log("in login.js /adminpanel");
  //     // } else {
  //     //   console.log("in login.js /admin");
  //     //   navigate("/")
  //     // }
  //   };
  //   verifyUser();
  // }, [document.cookie, navigate]);


  return (
    <div>
      <form onSubmit={handleSubmit} className="theme-form">
        <H4 className="text-uppercase">{Login}</H4>
        <H6>{LoginDetails}</H6>
        <FormGroup>
          <Label className="pt-0">{YourName}</Label>
          <Input type="text" name='email' defaultValue={values.email}
           onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>{Password}</Label>
          <Input type="password" name='password' defaultValue={values.password} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </FormGroup>
        <div className="checkbox p-0">
          <Input id="checkbox1" type="checkbox" />
          <Label htmlFor="checkbox1">{RememberMe}</Label>
        </div>
        <FormGroup className="row g-2 mt-3 mb-0">
          <Btn color="primary" className="d-block w-100">{Login}</Btn>
        </FormGroup>
        {/* <SocialIcons/>         */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
