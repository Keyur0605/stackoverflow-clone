import React, { useState, useEffect } from 'react'
import Header from './Header'
import { CirclesWithBar } from 'react-loader-spinner'
import "./Ask.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const username= JSON.parse(localStorage.getItem("user"))
  const token=username.token
  // const [qId, setQId] = useState('')
  // const [text, setText] = useState('')
  const [loader, setLoader] = useState(false)

  const [question, setQuestion] = useState([])
  const getQuestion = async () => {
    const data = await fetch('http://localhost:8000/question/list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      }
    })
    const response = await data.json()

    setQuestion(response)
    setLoader(true)
  }
  useEffect(() => {
    getQuestion()
  }, [])

  // const commitSend = (ques_id) => {
  //   setQId(ques_id)
  //   const item={text,ques_id}
  //   console.log(item,"item");
  //  fetch('http://localhost:8000/commit',{
  //   method:"POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `${token}`
  //   },
  //   body:JSON.stringify(item)
  //  }).then((response)=>{
  //   console.log(response);
  //   if(response.status === 201){
  //     setText("")
    
  //   }
  //   else if(response.status === 401){
  //     setText('')
  //   }
  //  }).catch((error)=>{
  //   console.log(error);
  //  })
  // }

  return (
    <div>
      <Header />
      {
        loader ? (<div className="container">
          <div className="row">
            <div className="col-9 my-4 mx-auto">
              {
                !question.length 
                ? 
                <h3 style={{ height: "85vh", display: "flex", justifyContent: "center ", alignItems: "center" }}>No Question Available.</h3>
                : 
                question.map((val, index) => {
                  const { _id, title } = val
                  return (
                    // <div className="card my-3" key={index}>
                    //   <div className="card-body">
                    //     <div className='d-flex justify-content-between'>
                    //       <div>
                    //         <label className='username'>Question Title</label>
                    //       </div>
                    //       <div className='d-flex'>
                    //         <span  className='username'> UserName: <span className='text-capitalize' style={{ fontWeight: "normal" }}> {user_name}</span></span>
                    //       </div>

                    //     </div>
                    //     <p style={{ fontSize: "30px" }} className='text-capitalize'>{title}</p>
                    //     <label className='mb-1 username' >Question Description</label>
                    //     <p className='text-capitalize'>{description}</p>
                    //     <img src={image} alt='code' width="500px" />
                    //     <div className='mt-3' >{tags.map((tag, tIndex) => <span className='me-3 tag-home' key={tIndex}>{tag}</span>)}</div>

                    //     <form className='mt-3' >
                    //       { _id === qId &&<textarea className="form-control" name='text'  placeholder='Add Your Commite' value={text} onChange={(e) => setText(e.target.value)} rows="3"></textarea>}
                    //       <a  className='btn btn-primary mt-2' onClick={() => commitSend(_id)}>Add Your Commit</a>
                    //     </form>
                    //   </div>
                    // </div>

                   <NavLink to={`/question/${_id}`} className="navlink-home" key={index} >
                    <p className='text-capitalize title-home'>{title}</p>
                    
                    </NavLink>
                  )
                })
              }
            </div>
          </div>
          <ToastContainer />
        </div>
        ) : <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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

    </div>
  )
}

export default Home
