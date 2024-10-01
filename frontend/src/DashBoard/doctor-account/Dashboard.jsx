import { useContext, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BACKEND_URL } from '../../utils/BaseUrl';
import Loading from '../../component/Loading/Loading';
import Error from '../../component/Error/Error';
import { toast } from 'react-toastify';
import Tabs from './Tabs';
import DoctorsAbout from '../../pages/Doctors/DoctorsAbout';
import Profile from './Profile';


const Dashboard = () => {
  const [tabs, setTabs] = useState("overview")
  const {data:doctor,loading,error}=useFetchData(`${BACKEND_URL}/api/doctors/profile/me`)
  console.log(doctor);

  
  return (
    <div className='max-w-[1170px] px-5 mx-auto my-14'>
      {loading && error && <Loading/>}
      {error && !loading && <Error error={error}/>}
      {!loading && !error && (
        <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
            <Tabs tabs={tabs} setTabs={setTabs} doctor={doctor}/>
            <div className="lg:col-span-2">
               {doctor.isApproved =="pending" && (
                <div className="flex p-4 mb-4 text-yellow-600 bg-yellow-50 items-center rounded-lg  gap-2">
                  <svg className="flex-shrink-0 w-5"  fill="#b8a442" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 478.125 478.125" xmlSpace="preserve" stroke="#b8a442">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g  id="SVGRepo_iconCarrier"> <g> <g> <g> <circle cx="239.904" cy="314.721" r="35.878"/> <path d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9 c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z"/> <path d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062 S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595 s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z"/> </g> </g> </g> </g>
                    </svg>
                    <span className="sr-only">
                      Info
                    </span>
                    <div>
                      To get approval please complete your Profile. We'll review manually and approve within 3days
                    </div>
                </div>
              )} 

             <div className="mt-4">
              {tabs==="overview" && (<>
                <div className="flex items-center gap-4 mb-10">
                  <figure className="max-w-[200px] max-h-[200px]">
                    <img src={doctor?.photo} className='w-full' alt="" />
                  </figure>
                 <div className=''>
                 <span className=" bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-6 text-[12px]
                  leading-4 rounded lg:text-[16px] lg:leading-7 font-semibold text-irisBlueColor ">
                    {doctor?.specialization || "Unavalible"}
                    </span>
                    <h2 className="text-[22px] leading-9 text-headingColor font-bold
                    mt-3 ">{doctor?.name || "Unavalible"}</h2>
                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 
                      font-semibold text-headingColor">
                        <img src="/src/assets/images/Star.png" alt="" />
                        {doctor?.averageRating }
                         </span>
                         <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor">({doctor?.totalRating })</span>
                         </div>
                         <p className="text-para text-[15px] leading-6 md:text-[15px] lg:max-w-[390px]">
                         {doctor?.bio}
                          </p>
                 </div>
                </div>
                 <DoctorsAbout 
                 name={doctor?.name} 
                 about={doctor?.about}
                 qualifications={doctor?.qualifications}
                 experiences={doctor?.experiences}
                  />
              </>) }
              {tabs==="appointments" && (
                <div className="">a</div>
              ) }
              {tabs==="profile" && (
                <Profile doctor={doctor} />
              ) }
             </div>
              </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
