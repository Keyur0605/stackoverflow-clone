import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner';
import ProfileCard from './ProfileCard'
const UserProfileData = () => {
  const {datas} = useParams()
  const[data,setData]=useState("")
  const[show,setShow]=useState(false)
  console.log(datas,"user");
    useEffect(()=>{
       try {
        const localData = JSON.parse(localStorage.getItem("user"))
        const token = localData.token
        fetch(`${process.env.REACT_APP_LINK}/profile/${datas}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(async(response)=>{
            const res= await response.json()
            console.log(res,"res");
            setData(res)
            setShow(true)
        })
       } catch (error) {
        console.log(error,"admin profile");
       }
    },[])
  return (
    <div>
     {
      show?<ProfileCard name={data.name} picture={data.picture} dob={data.dob} email={data.email} gender={data.gender} type={data.type} tags={data.tags} message="Message"/>:<div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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

export default UserProfileData
