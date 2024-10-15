import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BACKEND_URL } from '../../utils/BaseUrl';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
const DoctorsFeedbackFrom = () => {

    const [rating, setRating] = useState(0)
    const [error,  setError] = useState(null)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [loading, setLoading] = useState(false)
    const {id}=useParams()
    const token=localStorage.getItem("token")


    
    const onSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true)
        try {
          if (!rating || !reviewText) {
            setLoading(false)
            toast.error("Rating & Review Both Are Required")
           
          }
          const response = await axios.post(`${BACKEND_URL}/api/doctors/${id}/reviews`,{rating,reviewText},{
            headers: {
              'Authorization': `Bearer ${token}` 
          }
          })
          console.log(response);
          
          toast.success(response.data.message)
        
          
        } catch (error) {
          if (error.message === "Request failed with status code 401") {
            console.log(error);
            toast.error(error.response.data.message)
           
          }else{
          toast.error(error.message)
          setError(error.message)
          console.log(error);
         
          }
        }finally{
          setLoading(false)
        }
    }
     
  return (
    <form onSubmit={onSubmit}>
        <div>
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-0'>
                How would yo like to rate the overall esperience?*
            </h3>
            {/* dispalying star  */}
            {[...Array(5).keys()].map((_,index)=>{
                index +=1

                // rating system
                return(
                <button type='button'
                  className={`${index <= ((rating && hover) || hover) ? "text-yellowColor":"text-gray-400"} 
                  text-[22px] cursor-pointer bg-transparent border-none outline-none`}
                  onClick={()=>setRating(index)}
                  onMouseEnter={()=>setHover(index)}
                  onMouseLeave={()=>setHover(rating)}
                  onDoubleClick={()=>{
                    setHover(0);
                    setRating(0);
                  }                   
                  }
                  key={index}>
                 <span><AiFillStar/></span>
                    </button>
                )
            })}
        </div>
        <div className="mt-[30px]">
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mt-0'>
                share your feedback and suggestions
            </h3>
            {/* submit message */}
            <textarea className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor
            w-full px-4 py-3 rounded-md' rows={5} placeholder='Write your message'
             value={reviewText} onChange={(e)=>setReviewText(e.target.value)}></textarea>
             <button className="btn" type='submit'>{loading ?  <HashLoader size={25} color='#FFF'/>:"Submit Feedback"}</button>
        </div>
    </form>
  )
}

export default DoctorsFeedbackFrom
