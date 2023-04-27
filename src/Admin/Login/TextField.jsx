import React from "react";
import{ErrorMessage,useField} from 'formik';
import "./Login.css";

 const TextField = ({...props})=>{
const[field,meta]=useField(props);
console.log(meta)
return(
    <div className="mb-2">
     {/* <label htmlFor={field.name}>{label}</label> */}
     <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}  VLoginfield`} 
     {...field}{...props}
     autoComplete="off"
     />
     <ErrorMessage component="div" name={field.name} className="error"/>
    </div>
)
}
export default TextField;