import {useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useFetchData = (url) => {
const token=localStorage.getItem("token")
const user=localStorage.getItem("user")

const [data, setData] = useState([])
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)

useEffect(() => {
  const fetchData=async ()=>{
    setLoading(true)
    setError(null)
  try {

      const response =await fetch(url,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      const data = await response.json();
     setTimeout(() => {
      setData(data.data)
      setLoading(false)  
     }, 700);
  } catch (error) {
    if (error.message === "Request failed with status code 401") {
      console.log(error);
      toast.error(error.response.data.message)
    }else{
    toast.error(error.message)
    setError(error.message)
    console.log(error);
    }
  }
   
  }
  fetchData()
}, [url,token,user])

      return{
        data,loading,error
      }
}

export default useFetchData
