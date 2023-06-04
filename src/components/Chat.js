import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';
import io from "socket.io-client"

import "./Chat.css"

var socket = io.connect("http://localhost:8000")
const Chat = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [data, setData] = useState()
  const [loader, setLoader] = useState(false)
  const [chatMessage, setChatMessage] = useState([])
  const [chatloader, setChatLoader] = useState(false)
  const [adminRoom, setAdminRoom] = useState('')

  if (localStorage.getItem("user")) {
    const localdata = JSON.parse(localStorage.getItem("user"))
    var user_name = localdata.user
  }


  const sendMeassge = () => {
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
    else {
      try {
        const data = { message: text, name: user_name }

        console.log("hello friends");
        socket.emit("message", data.name, text, adminRoom)
        console.log("hi");

        setChatMessage((prev) => {
          return [...prev, data]

        })
        setText('')
      } catch (error) {
        console.log(error);
      }

    }

  }

  const joinChat = () => {

    if (localStorage.getItem("user")) {
      try {
        const localdata = JSON.parse(localStorage.getItem("user"))
        const token = localdata.token
        if (data.admin === true) {
          socket.emit("joinRoom", token, adminRoom)
        }
        else {
          socket.emit("joinRoom", token)
        }
      } catch (error) {
        console.log(error);
      }

    }
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
    else {
      const Profile = () => {
        setLoader(false)
        const localdata = JSON.parse(localStorage.getItem("user"))
        const token = localdata.token
        fetch(`${process.env.REACT_APP_LINK}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          }
        }).then(async (response) => {

          const Data = await response.json()
          setData(Data)
          setAdminRoom(Data.type)
          setLoader(true)
        }).catch((error) => {
          console.log(error);

        })
      }
      const setUpEvent = () => {
        socket.on("addmessage", (message, name) => {
          const datas = { message, name }
          setChatMessage((prev) => {
            return [...prev, datas]
          })
        })
      }
      Profile()
      setUpEvent()
    }
  }, [])



  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
    else {
      const chat = () => {
        try {
          setChatLoader(false)
          const localData = JSON.parse(localStorage.getItem("user"))
          const token = localData.token
          fetch(`${process.env.REACT_APP_LINK}/chat/${adminRoom}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${token}`
            }
          }).then(async (response) => {
            const res = await response.json()
            console.log(res, "responce");
            if (res.msg === "There is no message yet.") {
              setChatLoader(true)
              setChatMessage([])
            }
            else {
              setChatMessage(res)
              setChatLoader(false)
            }
          }).catch((error) => {
            console.log(error);
            setChatLoader(false)
          })
        } catch (error) {
          console.log(error);
        }

      }
      chat()
    }

    joinChat()

  }, [adminRoom])





  return (
    <>
      {loader ?
        <div className='section'>
          <div className="container">
            <div className="row">
              <div className='mt-3 d-flex' style={{ borderBottom: "1px solid gray" }}>
                {
                  data.picture === "" ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." width="55px" height="55px" style={{ borderRadius: "50%" }} /> :  <img src={data.picture} alt="..." width="55px" height="55px" style={{ borderRadius: "50%" }} />
                }

                <div className='ms-3 mt-1'>
                  <h5 style={{ color: "white" }} className='text-capitalize mb-0'>{data.name}</h5>
                  <span className="dot"></span><span className='active-button'>Active Now</span>
                </div>
                <div className='ms-auto d-flex'>
                  {data.admin === true ?
                    <select className="form-select me-3 my-2" value={adminRoom} onChange={(e) => setAdminRoom(e.target.value)} required>
                      <option selected disabled value="">Choose...</option>
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Tester</option>
                      <option>Non IT Field</option>
                    </select> : ""}
                  <NavLink to='/'><button className='btn btn-primary' style={{ height: "38px", marginTop: "12px", width: "130px" }}>Leave Chat</button></NavLink>

                </div>
              </div>
              <div className="chat-convertation mt-2 scroll" >
                <ul className='text'>

                  {chatloader === true ? <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ color: "white" }}>There is no Message Yet.</h1>
                  </div> : 
                    chatMessage.map((val, index) => {
                      const { message, name } = val;
                      return (
                        <>
                          <li className={name !== user_name ? "left" : "right"} key={index}>{message} <span className='d-flex justify-content-end' style={{ fontSize: "12px" }}>{name}</span></li>
                        </>
                      )
                    })
                  }

                </ul>
              </div>

            </div>
            <div >
              <form className='d-flex justify-content-center'>
                <input type="text" placeholder='Message write here' className='w-75 mb-3 inputs' name='text' value={text} onChange={(e) => setText(e.target.value)} />
                <button type='button' className='btn btn-primary my-3 ms-3' style={{ padding: "0px !important" }} onClick={sendMeassge}>Send</button>
              </form>
            </div>
          </div>
        </div> :
        <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
          /></div>
      }
    </>
  )
}

export default Chat
