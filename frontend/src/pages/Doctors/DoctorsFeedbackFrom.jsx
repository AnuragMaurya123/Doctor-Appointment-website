import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

const DoctorsFeedbackFrom = () => {

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState("")

    const onSubmit=async (e)=>{
        e.preventDefault();
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
             <button className="btn" type='submit'>Submit Feedback</button>
        </div>
    </form>
  )
}

export default DoctorsFeedbackFrom
