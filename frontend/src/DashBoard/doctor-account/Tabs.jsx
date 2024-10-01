import axios from 'axios';
import React, { useContext, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { BACKEND_URL } from '../../utils/BaseUrl';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Tabs = ({tabs, setTabs, doctor}) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
  const { dispatch,token} = useContext(AuthContext);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
      };
    
  
      
    
      const deleteUser=async (id)=>{
        setDeleteLoading(true)
       try {
        const response=await axios.delete(`${BACKEND_URL}/api/doctors/${id}`,{
          headers:{
            'Authorization': `Bearer ${token}` 
          }
        })
        6
        if (response.data.success) {
        dispatch({ type: "LOGOUT" });
          toast.success(response.data.message)
        }
       } catch (error) {
        if (error.message === "Request failed with status code 401") {
          console.log(error);
          toast.error(error.response.data.message)
          setError(error.response.data.message)
        }else{
        toast.error(error.message)
        setError(error.message)
        console.log(error);
        }
       }finally {
        setDeleteLoading(false);
    }
        
      } 
    
  return (
    <div>
        <span className="lg:hidden">
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>

          <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
            <button onClick={()=>{setTabs("overview")}} className={`${tabs=== "overview" ? "bg-blue-100 text-primaryColor":" bg-transparent text-black"} w-full btn  mt-0 rounded-md`}>
                Overview
            </button>
            <button onClick={()=>{setTabs("appointments")}} className={`${tabs=== "appointments" ? "bg-blue-100 text-primaryColor":"bg-transparent text-black"} w-full btn  mt-0 rounded-md`}>
               Appointments
            </button>
            <button onClick={()=>{setTabs("profile")}} className={`${tabs=== "profile" ? "bg-blue-100 text-primaryColor":"bg-transparent text-black"} w-full btn  mt-0 rounded-md`}>
                Profile
            </button>
            <div className="mt-[50px] md:mt-[100px]">
              <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] rounded-md leading-7 text-white">Logout</button>
              <button onClick={()=>deleteUser(doctor?._id)}  className="w-full bg-red-600 p-3 text-[16px] rounded-md leading-7 mt-4 text-white"> {deleteLoading ? <HashLoader size={50} color='#fff'/>: " Delete Account"}</button>
            </div>
           
          </div>
      
    </div>
  )
}

export default Tabs
