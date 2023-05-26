import React, { useState, useEffect } from 'react'
import Header from './Header'
import "./Ask.css"
const Tag = () => {
  const [tags, setTags] = useState([])
  const data = async () => {
    const api = await fetch('http://localhost:8000/tags')
    const response = await api.json()
    setTags(response)
  }
  
  useEffect(() => {
     data()
  }, [])
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
         
            {
              tags.map((val, index) => {
                const {name,description}=val
                return (
                  <>
                  <div className="col-3 mx-auto my-3" key={index}>
                    <div className="card" style={{width:"18rem"}}>
                      <div className="card-body">
                        <h6 className="card-title" style={{background:"#e1ecf4",display:"inline-block",padding:"10px",borderRadius:"10px",color:"#39739d"}}>{name}</h6>
                        <div className='asdf'>
                        <p className="card-text" style={{fontSize:"15px"}}>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
 
  )
}

export default Tag
