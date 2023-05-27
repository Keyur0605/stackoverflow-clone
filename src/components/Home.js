import React, { useState, useEffect } from 'react'
import Header from './Header'
import { CirclesWithBar } from 'react-loader-spinner'
import "./Ask.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const Home = () => {

  const [loader, setLoader] = useState(false)
  const [pageno, setPageNo] = useState(1)
  const [question, setQuestion] = useState()
  const prevpage = (e) => {
    e.preventDefault()
    if (pageno >= 2) {
      setPageNo(pageno - 1)
    }
  }
  const nextpage = (e) => {
    e.preventDefault()
    setPageNo(pageno + 1)
  }

  const getQuestion = async () => {
    const data = await fetch(`${process.env.REACT_APP_LINK}/question/list/${pageno}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      }
    })
    const response = await data.json()

    setQuestion(response.allData)
    setLoader(true)
  }
  useEffect(() => {
    getQuestion()
  }, [pageno])



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
                  <h3 style={{ height: "85vh", display: "flex", justifyContent: "center ", alignItems: "center" }} >No Question Available.</h3>
                  :
                  question.map((val, index) => {
                    const { _id, title } = val
                    return (

                      <>
                        <div className="title-home my-2" key={index}>
                          <NavLink to={`/question/${_id}`} style={{ textDecoration: "none", color: "black", fontSize: "21px" }}  >
                            <p className='text-capitalize question-title'>{title}</p>
                          </NavLink>
                          <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum sequi minus perspiciatis voluptas tenetur ea ut, necessitatibus alias quaerat nesciunt!</p>
                          <span className='tag-home'>html</span>
                        </div>
                      </>
                    )
                  })
              }
              <div className='d-flex justify-content-end'>
                <button className='btn btn-primary me-2' onClick={prevpage}>Prev</button>
                <span className='mt-2' style={{ fontSize: "17px" }}>{pageno}</span>
                <button className='btn btn-primary ms-2' onClick={nextpage}>Next</button>
              </div>
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
