import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
const SingleQuestion = () => {
    const {id} = useParams()
    const [text, setText] = useState('')

    const commitSend = (ques_id) => {
        const username= JSON.parse(localStorage.getItem("user"))
        const token=username.token
        const item={text,ques_id}
        console.log(item,"item");
       fetch('http://localhost:8000/commit',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body:JSON.stringify(item)
       }).then((response)=>{
        console.log(response);
        if(response.status === 201){
          setText("")
        
        }
        else if(response.status === 401){
          setText('')
        }
       }).catch((error)=>{
        console.log(error);
       })
      }
    
  return (
    <div>
        <h1>{id}</h1>
     <div className="container">
        <div className="row">
            <div className="col-10 mx-auto">
            <div className="card my-3">
                       <div className="card-body">
                         <div className='d-flex justify-content-between'>
                           <div>
                             <label className='username'>Question Title</label>
                           </div>
                           <div className='d-flex'>
                             <span  className='username'> UserName: <span className='text-capitalize' style={{ fontWeight: "normal" }}>keyur</span></span>
                           </div>

                         </div>
                         <p style={{ fontSize: "30px" }} className='text-capitalize'>qwertyuiop sdfghjkdfgh ryetyughijk?</p>
                         <label className='mb-1 username' >Question Description</label>
                         <p className='text-capitalize'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias incidunt eum, quisquam placeat provident rerum odio iste dignissimos neque reprehenderit consequatur ipsa temporibus distinctio soluta quae sint repudiandae, a repellendus!</p>
                         <img src="" alt='code' width="500px" />
                         {/* <div className='mt-3' >{tags.map((tag, tIndex) => <span className='me-3 tag-home' key={tIndex}>{tag}</span>)}</div> */}

                         <form className='mt-3' >
                           <textarea className="form-control" name='text'  placeholder='Add Your Commite' value={text} onChange={(e) => setText(e.target.value)} rows="3"></textarea>
                           <a  className='btn btn-primary mt-2' onClick={ commitSend}>Add Your Commit</a>
                         </form>
                       </div>
                     </div>
            </div>
        </div>
     </div>
      
    
    </div>
  )
}

export default SingleQuestion
