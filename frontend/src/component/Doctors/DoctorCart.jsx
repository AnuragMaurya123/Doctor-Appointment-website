import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import starIcon from "../../assets/images/Star.png";

const DoctorCart = ({ doctor }) => {
  const { _id, name, specialization, averageRating, totalRating, photo, experiences } = doctor;
  
  return (
    <div className="px-3 lg:p-5">
      <img className="w-full" src={photo} alt={`Photo of Dr. ${name}`} />
      <h2 className="text-[18px] leading-[30px] lg:leading-9 lg:text-[26px] text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>

      <div className="flex items-center justify-between mt-2 lg:mt-4">
        <span className="bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-6 text-[12px] leading-4 rounded lg:text-[16px] lg:leading-7 font-semibold text-irisBlueColor">
          {specialization}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] lg:text-[16px] leading-6 lg:leading-7 font-semibold text-headingColor">
            <img src={starIcon} alt="Star icon" />{averageRating}
          </span>
          <span className="flex items-center gap-[6px] text-[14px] lg:text-[16px] leading-6 lg:leading-7 font-[400] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-[18px] lg:mt-5">
        <div>
          <p className="text-[14px] lg:text-[16px] leading-6 lg:leading-7 font-[400] text-textColor">
            {experiences && experiences[0]?.hospital ? `At ${experiences[0].hospital}` : 'Experience information not available'}
          </p>
        </div>

        <Link to={`/doctors/${_id}`} className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
          <FaArrowRightLong className="group-hover:text-white w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCart;
