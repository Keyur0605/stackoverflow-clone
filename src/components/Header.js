import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
const Header = () => {
 
  const navigate = useNavigate()
  const cookie = new Cookies()
   const username= JSON.parse(localStorage.getItem("user"))
  const logout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_LINK}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${cookie.get('jwt')}`
      },
    }).then((responce) => {
      navigate('/login')
    }).catch((eror) => {
      console.log(eror);
    })

    localStorage.clear('jwt')

  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <h3>stackOverflow</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav mx-auto">

              {
                localStorage.getItem("user") ? <><NavLink to="/" className="mx-3" style={{ textDecoration: "none", color: "black", marginTop: "6px" }}> Home</NavLink>
                  <NavLink to="/question" className="mx-3" style={{ textDecoration: "none", color: "black", marginTop: "6px" }}>Question</NavLink>
                  <NavLink to="/tag" className="mx-3" style={{ textDecoration: "none", color: "black", marginTop: "6px" }}>Tag</NavLink>
                <div  style={{position:"fixed",top:"9px",right:"20px"}}>
                 <NavLink to="/profile"><button className='btn btn-primary me-3'>Profile</button></NavLink>
                 <button className='btn btn-danger' onClick={logout} >Logout</button>
                 </div>
                </>

                  :
                  <>
                    <NavLink to="/" className="mx-3" style={{ textDecoration: "none", color: "black" }}> Home</NavLink>
                    {/* <NavLink to="/register" className="mx-3" style={{ textDecoration: "none", color: "black" }}> Register</NavLink> */}
                    <NavLink to="/login" className="mx-3" style={{ textDecoration: "none", color: "black" }}>Sign in</NavLink>
                  </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
