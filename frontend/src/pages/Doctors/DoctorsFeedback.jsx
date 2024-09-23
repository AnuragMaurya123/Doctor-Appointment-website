import React, { useState } from 'react'
import avatar from "../../assets/images/avatar-icon.png"
import { formData } from '../../utils/fromData'
import { AiFillStar } from 'react-icons/ai'
import DoctorsFeedbackFrom from './DoctorsFeedbackFrom'
const DoctorsFeedback = () => {

    const [showFeedbackFrom, setShowFeedbackFrom] = useState(false)
  return (
    <div>
        <div className='mb-[50px]'>
       <h4 className="text-[20px] leading-[30px] text-headingColor font-bold mb-[30px]">
        All review (272)
        </h4> 
        <div className="flex  justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                    <img className='w-full' src={avatar} alt="" />
                </figure>

                <div>
                    <h4 className="text-[16px] leading-6 text-primaryColor font-bold">Anurag Maurya</h4>
                    <p className="text-[14px] leading-6 text-textColor">{formData("12-11-2009")}</p>
                    <p className="text-para mt-3 font-medium text-[15px]">Good service,Highly recommended </p>
                </div>
                </div> 
              
            {/* show star  */}
                <div className="flex gap-1">
                    {[...Array(5).keys()].map((_,index)=> <AiFillStar key={index} color='#0067FF' />)}
                </div>             
        </div>
        {/* showing feedback from */}
        {showFeedbackFrom ? <DoctorsFeedbackFrom/>:<div>
                    <button onClick={()=>setShowFeedbackFrom(true)} className="btn">Give Feedback</button>
                </div>}
    </div>
    </div>
  )
}

export default DoctorsFeedback
