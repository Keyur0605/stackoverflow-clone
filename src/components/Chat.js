import React, { useEffect ,useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner'
import "./Chat.css"
const Chat = () => {
const navigate=useNavigate()
const[data,setData]=useState()
const[loader,setLoader]=useState(false)
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
              console.log(Data);
              setData(Data)
              setLoader(true)
          }).catch((error) => {
              console.log(error);
              setLoader(false)
          })
      }
  }, [])

 
  return (
    <>
    {loader?<div className='section'>
        <div className="container">
            <div className="row">
              <div className='mt-3 d-flex' style={{borderBottom:"1px solid gray"}}>
                {
                data.picture === ""  ?<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." width="55px" height="55px" style={{borderRadius:"50%"}} />:
                <img src={data.picture} className='mb-3' alt="profile" style={{borderRadius:"50%"}} width="55px" height="55px" />
                }
              
                <div className='ms-3 mt-1'>
                  <h5 style={{color:"white"}} className='text-capitalize mb-0'>{data.name}</h5>
                  <span class="dot"></span><span className='active-button'>Active Now</span>
                </div>
               <NavLink to="/" className="ms-auto"><button className='btn btn-primary' style={{height:"38px",marginTop:"12px"}}>Back to Home Page</button></NavLink> 
              </div>
             <div className="chat-convertation mt-2 scroll" >
                <ul className='text'>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                     <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                     <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                    <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>
                     <li className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed officiis voluptas nihil sint illum commodi perferendis. Itaque, repellat. Doloribus minus nesciunt omnis asperiores? Id vero nemo incidunt modi deleniti!</li>
                    <li className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum at cum culpa consequatur iure mollitia, fuga amet beatae rem error vero corporis quam dolore. Beatae placeat sequi ab nesciunt itaque?</li>


                </ul>
             </div>
             
            </div>
            <div >
             <form className='d-flex justify-content-center'>
             <input type="text" placeholder='Message write here'  className='w-75 mb-3 inputs'/>
             <button className='btn btn-primary my-3 ms-3' style={{padding:"0px !important"}}>Send</button>
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
