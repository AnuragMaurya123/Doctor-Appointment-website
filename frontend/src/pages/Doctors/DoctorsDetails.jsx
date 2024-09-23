import React, { useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png"
import DoctorsAbout from "./DoctorsAbout";
import DoctorsFeedback from "./DoctorsFeedback";
const DoctorsDetails = () => {
  const [tad, setTad] = useState("about")
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              {/* doctors Image */}
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorImg} alt="" className="w-full" />
              </figure>
              <div>
                <span
                  className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px]
          leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
                >
                  Surgeon
                </span>
                <h2 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  Anurag Maurya
                </h2>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                  lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" /> 4.8
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px]
                  lg:leading-7 font-semibold text-textColor">(275)
                  </span>
                </div>
                <p className="text-para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots .</p>
              </div>
            </div>

      {/* toggle between about abd feedback */}
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button onClick={()=>setTad('about')} className={`${tad==="about" && "border-b border-solid border-primaryColor"} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                About
              </button>
              <button onClick={()=>setTad('feedback')} className={`${tad==="feedback" && "border-b border-solid border-primaryColor"} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                Feedback
              </button>
            </div>

      {/* toggle between display about abd feedback */}
      <div className="mt-[50px]">{tad === "about" ? <DoctorsAbout/>:<DoctorsFeedback/>}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsDetails;
