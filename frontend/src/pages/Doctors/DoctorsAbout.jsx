import React from 'react'
import { formData } from '../../utils/fromData'

const DoctorsAbout = ({name,about,qualifications,experiences}) => {
    console.log(experiences);
    
  return (
    <div>
    <div className="">
    <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
        About of
        <span className="text-irisBlueColor font-bold text-[24px] leading-9">{name}</span>
        </h3> 
        <p className="text-para">{about} </p>
    </div>  
    <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Eduaction</h3>
        <ul className="pt-4 md:p-5">
            {qualifications?.map((qualification,index)=>(
                <div key={index}>
                 <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{formData(qualification.startingDate)} - {formData(qualification.endingDate)}</span>
                <p className="text-[16px] leading-6 font-medium text-textColor">{qualification.degree}</p>
                </div>
                <p className="text-[15px] leading-5 font-medium text-textColor flex justify-end">{qualification.university}</p>
            </li>
                </div>
            ))}
           
        </ul>
    </div>

    <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Experience</h3>
    <ul className="grid sm:grid-cols-2 gap-[30px] pt-4  md:p-5">
    {experiences?.map((experience,index)=>(
        <div key={index}>
            <li className="p-4  rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold" >{formData(experience.startingDate)} - {formData(experience.endingDate)}</span>
            <p className="text-[16px] leading-5 font-medium text-textColor flex ">{experience.position}</p>
            <p className="text-[14px] leading-5 font-medium text-textColor flex">{experience.hospitial}</p>
        </li>
        </div>
    ))}
        
    </ul>
     </div>
    </div>
  )
}

export default DoctorsAbout
