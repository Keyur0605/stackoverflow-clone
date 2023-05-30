import React,{useEffect} from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
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
          <div className="col-4 mx-auto">
            <form onSubmit={handleSubmit} className='mt-5' >
              <h3 className="text-center mb-4">Sign Up</h3>
              <div >
                  <input type="text"  className="form-control mb-3" placeholder='User Name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                  {errors.name && touched.name ?<p style={{color:"red"}}>{errors.name}</p>:null}
              </div>
              <div >
                  <input type="email" className="form-control mb-3" placeholder='E-Mail'name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}  />
                  {errors.email && touched.email ?<p style={{color:"red"}}>{errors.email}</p>:null}
              </div>
              <div >
                  <input type="password"  className="form-control mb-3" placeholder='Password' name='password'  value={values.password} onChange={handleChange} onBlur={handleBlur} />
                  {errors.password && touched.password ?<p style={{color:"red"}}>{errors.password}</p>:null}
              </div>
             <div className="d-grid" style={{boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
              <button type="submit" className='btn btn-primary mt-4 ' >Sign Up</button>
             </div>
             <div className='d-flex justify-content-end'>
              <NavLink to="/login"><p className=' mt-4 ' style={{color:"#1976d2",textDecoration:"underline"}}>Already have an account? Sign in</p></NavLink>
            </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Register
