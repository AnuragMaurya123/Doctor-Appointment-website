import React, { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorsAbout from "./DoctorsAbout";
import DoctorsFeedback from "./DoctorsFeedback";
import Slidebar from "./Slidebar";

import { BACKEND_URL } from "../../utils/BaseUrl";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../component/Loading/Loading";
import Error from "../../component/Error/Error";

const DoctorsDetails = () => {
  const [tad, setTad] = useState("about");
  const { id: doctorId } = useParams(); // Destructure 'id' directly from useParams
  const [doctor, setDoctor] = useState(null); // Use null instead of empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      setError(null); // Clear previous error before fetching

      try {
        const response =await fetch(`${BACKEND_URL}/api/doctors/${doctorId}`,{
          method:"Get",
          headers:{
            "Content-Type":"application/json",
          }
        })
        const data=await response.json()        
        setTimeout(() => {
          setDoctor(data.data)
          setLoading(false)  
         }, 1000);
      } catch (error) {
        setError(error.message || "Something went wrong.");
        toast.error(error.message || "An error occurred while fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);
  

  // Conditionally render content
  if (loading|| !doctor) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }


  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              {/* Doctor Image */}
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctor?.photo} alt={doctor?.name} className="w-full" />
              </figure>

              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {doctor?.specialization}
                </span>

                <h2 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{doctor?.name}</h2>

                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="Rating" /> {doctor?.averageRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor">
                    ({doctor?.totalRating})
                  </span>
                </div>

                <p className="text-para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                  {doctor?.bio}
                </p>
              </div>
            </div>

            {/* Toggle Between About and Feedback */}
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTad('about')}
                className={`${tad === "about" ? "border-b border-solid border-primaryColor" : ""} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTad('feedback')}
                className={`${tad === "feedback" ? "border-b border-solid border-primaryColor" : ""} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            {/* Display About or Feedback Based on State */}
            <div className="mt-[50px]">
              {tad === "about" ? (
                <DoctorsAbout
                  name={doctor?.name}
                  about={doctor?.about}
                  experiences={doctor?.experiences}
                  qualifications={doctor?.qualifications}
                />
              ) : (
                <DoctorsFeedback reviews={doctor?.reviews} totalRating={doctor?.totalRating} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Slidebar DoctorId={doctor?._id} timeSolts={doctor?.timeSlots} price={doctor?.ticketPrice} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsDetails;
