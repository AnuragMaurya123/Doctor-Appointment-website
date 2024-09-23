import React from 'react'
import { formData } from '../../utils/fromData'

const DoctorsAbout = () => {
  return (
    <div>
    <div className="">
    <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
        About of
        <span className="text-irisBlueColor font-bold text-[24px] leading-9">Anurag Maurya</span>
        </h3> 
        <p className="text-para">Contrary to popular belief, Lorem Ipsum is not simply 
            random text. It has roots in a piece of classical Latin literature from 45 BC,
             making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin 
              words, consectetur, from a Lorem Ipsum passage, and going through the cites 
              of the word in classical literature, discovered the undoubtable source. Lorem
               Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et </p>
    </div>  
    <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Eduaction</h3>
        <ul className="pt-4 md:p-5">
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                    <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{formData("12-08-2008")} - {formData("12-08-2008")}</span>
                    <p className="text-[16px] leading-6 font-medium text-textColor">PHD in surgeon</p>
                </div>
                <p className="text-[15px] leading-5 font-medium text-textColor flex justify-end">Apollo Hospital, chennai</p>
            </li>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                    <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{formData("04-12-2008")} - {formData("12-08-2008")}</span>
                    <p className="text-[16px] leading-6 font-medium text-textColor">PHD in surgeon</p>
                </div>
                <p className="text-[15px] leading-5 font-medium text-textColor flex justify-end">Apollo Hospital, chennai</p>
            </li>
        </ul>
    </div>

    <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Experience</h3>
    <ul className="grid sm:grid-cols-2 gap-[30px] pt-4  md:p-5">
        <li className="p-4  rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold" >{formData("04-12-2008")} - {formData("12-08-2008")}</span>
            <p className="text-[16px] leading-5 font-medium text-textColor flex ">sr. Surgeon</p>
            <p className="text-[14px] leading-5 font-medium text-textColor flex">Apollo Hospital, chennai</p>
        </li>
        <li className="p-4  rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold" >{formData("04-12-2008")} - {formData("12-08-2008")}</span>
            <p className="text-[16px] leading-5 font-medium text-textColor flex ">sr. Surgeon</p>
            <p className="text-[14px] leading-5 font-medium text-textColor flex">Apollo Hospital, chennai</p>
        </li>
    </ul>
     </div>
    </div>
  )
}

export default DoctorsAbout
