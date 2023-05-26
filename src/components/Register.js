import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useFormik } from 'formik';
import {signUpSchema} from "../schema/validation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 const initialValues={
  name:"",
  email:"",
  password:""

 }
 
const Register = () => {

  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("user")){
     
    }
  },[])
  const {values,handleBlur,touched,handleSubmit,handleChange,errors} =useFormik({
    initialValues:initialValues,
    validationSchema: signUpSchema,
    onSubmit : (values,action)=>{
     
     
        action.resetForm()
        fetch(`${process.env.REACT_APP_LINK}/register`,{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(values)
        }).then(async(response)=>{
          const msg= await response.json()
          console.log(msg,"msg");
          if(response.status === 201){
            navigate('/login')
          }
          else if(response.status === 400){
            toast.error(msg.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
          else if(response.status === 409){
            toast.error(msg.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
        }).catch((error)=>{
           console.log(error);
        })
   
        
    }
  })
  
  

  

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <div >
                  <label  className="col-form-label">Dispaly Name</label>
                  <input type="text"  className="form-control" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                  {errors.name && touched.name ?<p style={{color:"red"}}>{errors.name}</p>:null}
              </div>
              <div >
                  <label className="col-form-label">Email</label>
                  <input type="email" className="form-control"name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}  />
                  {errors.email && touched.email ?<p style={{color:"red"}}>{errors.email}</p>:null}
              </div>
              <div >
                  <label  className="col-form-label">Password</label>
                  <input type="password"  className="form-control" name='password'  value={values.password} onChange={handleChange} onBlur={handleBlur} />
                  {errors.password && touched.password ?<p style={{color:"red"}}>{errors.password}</p>:null}
              </div>
             
              <button type="submit" className='btn btn-primary mt-4'>Register</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Register
