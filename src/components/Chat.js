import React, { useEffect ,useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';
import io from "socket.io-client"

import "./Chat.css"

var socket = io.connect("http://localhost:8000")
const Chat = () => {
const navigate=useNavigate()
const[text,setText]=useState('')
const[data,setData]=useState()
const[loader,setLoader]=useState(false)
const[chatMessage,setChatMessage]=useState([])


const localdata=JSON.parse(localStorage.getItem("user"))
var user_name= localdata.user

const sendMeassge=()=>{

    try {
      const data={message:text,name:user_name}
      console.log(data);
     socket.emit("message",text)
     setChatMessage((prev)=>{
      return [...prev,data]
     })
     
   setText('')

    } catch (error) {
      console.log(error);
    }
  
}

const joinChat=()=>{
 
  if(localStorage.getItem("user")){
   try {
     const localdata=JSON.parse(localStorage.getItem("user"))
     const token= localdata.token
     socket.emit("joinRoom",token)
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
        setLoader(false)
          const localData = JSON.parse(localStorage.getItem("user"))
          const token = localData.token
          fetch(`${process.env.REACT_APP_LINK}/profile`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `${token}`
              }
          }).then(async (response) => {

              const Data = await response.json()
              setData(Data)
              setLoader(true)
          }).catch((error) => {
              console.log(error);
              setLoader(false)
          })

          fetch(`${process.env.REACT_APP_LINK}/chat`,{
            method:"GET", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${token}`
          }
          }).then(async(response)=>{
            // console.log(response,"chat responce");
            const res = await response.json()
            console.log(res,"responce");
            setChatMessage(res)
          }).catch((error)=>{
            console.log(error);
          })
      }
      const setUpEvent=()=>{
        socket.on("addmessage",(message,name)=>{
          const datas= {message,name}
          console.log(datas,"datas");
  
        setChatMessage((prev)=>{
          return [...prev,datas]
        })
  
        })
       }
       setUpEvent()
       joinChat()
  }, [])

  // useEffect(()=>{
    
  // },[])

 

  return (
    <>
    {loader?<div className='section'>
        <div className="container">
            <div className="row">
              <div className='mt-3 d-flex' style={{borderBottom:"1px solid gray"}}>
                {
                data.picture === ""  ?<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." width="55px" height="55px"  style={{borderRadius:"50%"}} />:
                <img src={data.picture} className='mb-3' alt="profile" style={{borderRadius:"50%"}} width="55px" height="55px" />
                }
              
                <div className='ms-3 mt-1'>
                  <h5 style={{color:"white"}} className='text-capitalize mb-0'>{data.name}</h5>
                  <span class="dot"></span><span className='active-button'>Active Now</span>
                </div>
             <NavLink to='/' className="ms-auto"><button className='btn btn-primary'  style={{height:"38px",marginTop:"12px"}}>Leave Chat</button></NavLink>
              </div>
             <div className="chat-convertation mt-2 scroll" >
                <ul className='text'>
                
                  {
                      chatMessage.map((val,index)=>{
                       const{message,name}=val;
                        return(
                          <>
                          <li  className={name !== user_name?"left":"right"} key={index}>{message} <span className='d-flex justify-content-end' style={{fontSize:"12px"}}>{name}</span></li>
                         
                          </>
                        )
                      })
                  }

                </ul>
             </div>
             
            </div>
            <div >
             <form className='d-flex justify-content-center'>
             <input type="text" placeholder='Message write here'  className='w-75 mb-3 inputs' name='text' value={text} onChange={(e)=>setText(e.target.value)}/>
             <button type='button' className='btn btn-primary my-3 ms-3' style={{padding:"0px !important"}} onClick={sendMeassge}>Send</button>
             </form>
             </div>
        </div>
    </div>:
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
