import React, { useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";
const FaqItem = ({faq}) => {

    const [containShow, setContainShow] = useState(false)

    const show=()=>{
        setContainShow(!containShow)
    }

  return  <div className='p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer'>
          <div className="flex justify-between items-center gap-5">
            <h4 className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor'>{faq.question}</h4>
            <div onClick={show} className={`${containShow && "bg-primaryColor text-white border-none"} w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex
                items-center justify-center`}>{containShow ?<FiMinus />:<FiPlus /> }</div>      
          </div>
          {containShow ? 
          <div className='mt-4'>
            <p className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>{faq.content}</p>
            </div>
          :null}
    </div>
  
}

export default FaqItem
