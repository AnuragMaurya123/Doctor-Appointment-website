import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';


const useFetchData = (url) => {
const {token} = useContext(AuthContext)
const [data, setData] = useState([])
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)

useEffect(() => {
  const fetchData=async ()=>{
    setLoading(true)
    setError(null)
  try {

      const response =await axios.get(url ,{
        headers: {
          'Authorization': `Bearer ${token}` 
      }
      })
      
      setData(response.data.data)
      setLoading(false)   
    
  } catch (error) {
    setError(error.response.data.message+"🔌")
    setLoading(false)
  }
   
  }
  fetchData()
}, [url,token])

  return{
    data,loading,error
  }
}

export default useFetchData
