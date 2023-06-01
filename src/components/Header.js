import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {io} from "socket.io-client"
import Cookies from 'universal-cookie'

var socket = io.connect("http://localhost:8000")
const Header = () => {
  const [profiles, setProfiles] = useState()
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState(false)
  const navigate = useNavigate()
  const cookie = new Cookies()
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

  const profile = async () => {
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user"));
      const token = data.token
      const api = await fetch(`${process.env.REACT_APP_LINK}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      })
      const response = await api.json()
      setProfiles(response)
      setLoader(true)
    }
    else {
      
    }
  }

  const joinChat=async()=>{
 
   if(localStorage.getItem("user")){
    try {
      const localdata= await JSON.parse(localStorage.getItem("user"))
      const token=await localdata.token
      console.log(token,"ghcvjkj")
      socket.emit("joinRoom",token)
    } catch (error) {
      console.log(error);
    }
  
   }
  }
  
  useEffect(() => {
    profile()
    joinChat()
  }, [])

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
                localStorage.getItem("user") ? <><NavLink to="/" className="mx-3 " style={{ textDecoration: "none", color: "black", marginTop: "6px" }}> Home</NavLink>
                  <NavLink to="/question" className="mx-3" style={{ textDecoration: "none", color: "black", marginTop: "6px" }}>Question</NavLink>
                  <NavLink to="/tag" className="mx-3 " style={{ textDecoration: "none", color: "black", marginTop: "6px" }}>Tag</NavLink>

                </>

                  :
                  <>
                    <NavLink to="/" className="mx-3 " style={{ textDecoration: "none", color: "black" }}> Home</NavLink>
                    {/* <NavLink to="/register" className="mx-3 active" style={{ textDecoration: "none", color: "black" }}> Register</NavLink> */}
                    <NavLink to="/login" className="mx-3 " style={{ textDecoration: "none", color: "black" }}>Sign in</NavLink>
                  </>
              }


            </ul>
            {loader ?
              localStorage.getItem("user") ?
                <div className=''>
                  <div class="profile" style={{position:"relative"}} onClick={()=>setData(!data)}>
                   {
                    profiles.picture === ""? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." width="45px" height="45px" style={{borderRadius:"60%"}}   /> :<img src={profiles.picture} alt='' width="45px" height="45px" style={{borderRadius:"60%"}}/>
                   }
                    </div>
                    {data &&<div className='profile-card'>
                    <ul >
                      <h5 className='text-center mb-3 text-capitalize'>{profiles.name}</h5>
                      <span style={{fontSize:"13px"}}>{profiles.email}</span>
                      <NavLink to="/profile" className="mx-auto mt-3"><button className='btn btn-primary '>Profile</button></NavLink>
                      <NavLink to="/chat" className="mx-auto"><button className='btn btn-warning mt-3' >Chat</button></NavLink>
                      <button className='btn btn-danger mt-3 ' onClick={logout} >Logout</button>
                    </ul>
                  </div>}
                </div>
                :"":""}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
