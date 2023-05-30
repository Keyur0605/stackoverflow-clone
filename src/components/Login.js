import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useFormik } from 'formik';
import { login } from "../schema/validation"
import Cookies from "universal-cookie"
import { CirclesWithBar } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {
  email: "",
  password: ""

}

const Login = () => {
  const navigate = useNavigate()
  const[loader,setLoader]=useState(false)
  const cookies = new Cookies()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate('/')
    }
  }, [])
  const { values, handleBlur, touched, handleSubmit, handleChange, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: login,
    onSubmit: (values, action) => {

      action.resetForm()
      fetch(`${process.env.REACT_APP_LINK}/login`, {
        method: "POST",

        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(values)
      }).then(async (response) => {
        const token = await response.json()
        if(response.status === 201){
          let user = token.name
          cookies.set('jwt', token.token, { path: ' /' })
          localStorage.setItem(`user`, JSON.stringify({ user, token: token.token }))
          setLoader(true)
          navigate("/")
        }
        else if(response.status === 401){
          toast.error(token.msg, {
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
        
      }).catch((error) => {
        console.log(error);
      })



    }
  })

  // const google = (e) => {
  //   e.preventDefault()
  //   window.open("http://localhost:8000/auth/google", "_self");

  // }


  // const github=(e)=>{
  //   e.preventDefault()
  //   window.open("http://localhost:8000/auth/github", "_self");
  // }

  return (
    <div>
      <Header />
      {loader ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CirclesWithBar
            height="100"
            width="100"
            color="#0d6efd"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel='circles-with-bar-loading'
          /></div>:<div className="container mt-5">
        <div className="row">
          <div className="col-6 mx-auto">
            <form onSubmit={handleSubmit}>

              <div >
                <label className="col-form-label">Email</label>
                <input type="email" className="form-control" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {errors.email && touched.email ? <p style={{ color: "red" }}>{errors.email}</p> : null}
              </div>
              <div >
                <label className="col-form-label">Password</label>
                <input type="password" className="form-control" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {errors.password && touched.password ? <p style={{ color: "red" }}>{errors.password}</p> : null}
              </div>
              <button type="submit" className='btn btn-primary mt-4'>Login</button>
              <NavLink to="/forgotpassword"><button className='btn btn-primary mt-4 ms-4'>Forget Password</button></NavLink>
            </form>
            <button className="btn  btn-block text-uppercase d-block my-3"  style={{ color: "white", backgroundColor: "#ea4335" }}><i className="fab fa-google mr-2"></i> Sign in with Google</button>
            <button className="btn   btn-block text-uppercase d-block my-3" style={{ color: "white", backgroundColor: "#3b5998" }} ><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
            <button className="btn  btn-primary  btn-block text-uppercase d-block my-3"  ><i className="fab fa-facebook-f mr-2"></i> Sign in with LinkedIn</button>
            <button className="btn  btn-dark  btn-block text-uppercase d-block my-3"   ><i className="fab fa-facebook-f mr-2"></i> Sign in with GitHub</button>

            {/* <GoogleOAuthProvider clientId="115983779298-96dvhm5cgob06huephdvev4oa5092mek.apps.googleusercontent.com">


              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;</GoogleOAuthProvider> */}
          </div>
        </div>
      </div>}
      <ToastContainer/>
    </div>
  )
}

export default Login
