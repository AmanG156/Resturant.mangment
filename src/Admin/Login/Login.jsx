import React from 'react'
import{Formik,Form} from 'formik';
import TextField  from "./TextField";
import * as Yup from 'yup';
import icon from "../../asset/Icon.png"
import { userService } from "../../services/auth";
import { useNavigate } from "react-router-dom";

import "./Login.css"
export default function Login() {
  const navigate = useNavigate();
    const validate=Yup.object({
        email:Yup.string()
        .email('email is invalid')
        .required('Email is required'),
        password:Yup.string()
        .min(6,'Password must be atleast 6 charachter')
        .required('Password is required'),
    
      })
  return (
    <div className='Login_div'>
   <div className='Login_container'>
      <div className='Login_box'>
      <Formik
initialValues={{
    email:'',
    password:'',
}}
validationSchema={validate}
onSubmit={values=>{
    userService
    .login(values)
    .then((res) => {
        console.log(res.data.success)
        if(res?.data?.success && res.data?.data?.role === "Chef"){
            navigate('/chef/dashboard')
            return
          }
          if(res?.data?.success && res.data?.data?.role === "Admin"){
            navigate('/admin/dashboard')
            return
          }
    })
    .catch((err) =>  err)
}}
>
{formik=>(
<div className="VLogin_div">
    {/* <h1 className="my-4 font-weight-bold .display-4 heading_signup">Login</h1> */}
    <div className='login_icon'>
        <img src={icon} alt="No_img"/>
    </div>
    <div  className="VLogin">

    <Form>
        <TextField  placeholder="Email" name="email" type="email" />
        <TextField  placeholder="Password" name="password" type="password" />
        {/* <div className="VSwtich_forgot">Forgot Password ?</div> */}
         <button className="VLogin_btn" type="submit">Login</button>
   </Form>
   </div>
   {/* <div className="border"></div>
      <p className="already">
           I already have an account 
         </p>
         <div className="Login_register">Register Now</div> */}
</div>
)}
</Formik>
      </div>
   </div>
    </div>
  )
}
