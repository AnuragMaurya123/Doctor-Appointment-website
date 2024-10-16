import React, { useState } from 'react'
import convertedTime from '../../utils/convertedTime'
import { BACKEND_URL } from '../../utils/BaseUrl'
import { toast } from 'react-toastify';

const Slidebar = ({timeSolts,price,DoctorId}) => {
   const token=localStorage.getItem("token")
   const [loading, setLoading] = useState(false)
   const handlebooking=async(e)=>{
      e.preventDefault();
      setLoading(true)
      try {
         const response =await fetch(`${BACKEND_URL}/api/booking/checkout-session/${DoctorId}`,{
            method:"post",
            headers:{
               "Authorization":`Bearer ${token}`
            }            
          })
          const data=await response.json()
          
          if (!response.ok) {
            throw new Error(data.message+"please try again")
          }
          if (!data.success) {
           toast.error(data.message)
          }
          if (data.session.url) {
            window.location.href=data.session.url
          }
      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }

  return (
   
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
     <div className="flex items-center justify-between">
        <p className="text-para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
        &#8377; {price}
        </span>
     </div>

     <div className="mt-[30px]">
        <p className="text-para mt-0 font-semibold text-headingColor">Avaliable Time Slots</p>
        <ul className="mt-3">
        {timeSolts?.map((timeSolt,index) => <div key={index}>
            <li className='flex items-center justify-between mb-2'>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                   {timeSolt?.day.charAt(0).toUpperCase()+timeSolt?.day.slice(1)}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertedTime(timeSolt?.startingTime)} - {convertedTime(timeSolt?.endingTime)}
                </p>
            </li>      
            </div>
        )}      
        </ul>
        <button onClick={handlebooking} className="btn px-2 w-full rounded-md">Book Appointment</button>
     </div>
    </div>
  )
}

export default Slidebar
