import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
const AdminShowProfile = () => {
  const {data} = useParams
  console.log(data,"user");
    useEffect(()=>{
       try {
        const localData = JSON.parse(localStorage.getItem("user"))
        const token = localData.token
        fetch(`${process.env.REACT_APP_LINK}/profile/${data}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(async(response)=>{
            console.log(response,"admin profile response");
            const res= await response.json()
            console.log(res,"res");
        })
       } catch (error) {
        console.log(error,"admin profile");
       }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default AdminShowProfile
