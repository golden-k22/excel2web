
import { useState ,useEffect} from "react";
import { Col, FormGroup, Input, Row } from "reactstrap";
import { Btn, H4, H6 } from "../AbstractElements";
import {AlreadyUser,Href,Login,NewUser,SignUp,UserNameAndPassword,} from "../Constant";
import { Link, useNavigate } from 'react-router-dom'
import SocialIcons from "./SocialIcons";
import { toggleLoginForm } from "../Service";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import axios from 'axios';


const SignUpForm = (props:any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const generateError = (err: any) =>
    toast.error(err, {
      position: "top-right",
    });


  const onSubmit = async (values:any) => {

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
          toast.success("Successed!", {
            position: "top-right",
          });
          props.signin_success();
        }
      }

    } catch (error) {
      console.log(error);
    }

  }




  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="theme-form">
        <H4 className="text-center text-uppercase">{NewUser}</H4>
        <H6 className="text-center">{UserNameAndPassword}</H6>
        <Row className="g-2">
          <Col md="12">
            <FormGroup>
              <input type="text" placeholder="First Name"
              className="form-control"
              
              {...register("first_name", {
                required: "Last Name is required", maxLength: {
                  value: 20,
                  message: "First Name cannot exceed more than 20 characters"
                }
              })}
              />
              {errors.first_name && <p style={{ color: "red" }}>{errors.first_name.message}</p>}
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <input type="text" placeholder="Last Name" 
              className="form-control"
              
              {...register("last_name", {
                required: "Last Name is required", maxLength: {
                  value: 20,
                  message: "Last Name cannot exceed more than 20 characters"
                }
              })}
              />
              {errors.last_name && <p style={{ color: "red" }}>{errors.last_name.message}</p>}
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <input
              type="email"
              placeholder='Email'
              className="form-control"
              {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter valid email" } })}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </FormGroup>
        <FormGroup>
          <input type="password" placeholder="Password" 
              className="form-control"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters"

                },
                maxLength: {
                  value: 8,
                  message: "Password cannot exceed more than 8 characters"
                },
              })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </FormGroup>
        <Row className="g-2">
          <Col sm="4">
            <Btn color="primary">{SignUp}</Btn>
          </Col>
          <Col sm="8">
            <div className="text-start mt-2 m-l-20">
              {AlreadyUser}&nbsp;&nbsp;
              <a className="btn-link text-capitalize" href={Href} onClick={toggleLoginForm}>{Login}</a>
            </div>
          </Col>
        </Row>
        {/* <SocialIcons /> */}
      </form>
    </div>
  );
};

export default SignUpForm;
