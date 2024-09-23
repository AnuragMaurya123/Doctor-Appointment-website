import React, { useState } from 'react'
import DoctorCart from '../../component/Doctors/DoctorCart'
import { doctors } from '../../assets/data/doctors'
import Testimonial from '../../component/Testimonial/Testimonial';
const Doctors = () => {

  return (<>
    <section className='bg-[#fff9ea]'>
      <div className="container text-center">
        <h2 className="heading">
          Find a Doctor
        </h2>
        {/* Search input start */}
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md 
        flex items-center justify-between ">
        <input  type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none
        cursor-pointer placeholder:text-textColor' placeholder='search here' />
         <button  className="btn mt-0 rounded-[0px] rounded-r-md">Search</button>
        </div>
      </div>
    </section>
     {/* Search input end */}

    {/* doctors list start */}
           <section>
          <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-5  ">
            {doctors.map((doctor)=><DoctorCart doctor={doctor}  key={doctor.id}/>)}
          </div>
          </div>
        </section>
    {/* doctors list end */}
    
       {/*what's our patient doctors start */}
       <section>
      <div className="container">
      <div className="xl:w-[470px] mx-auto">
      <h2 className="heading text-center">What our patients say</h2>
      <p className="text-para text-center">World-class care for everyone. Our health System offers unmatches</p>
      </div>
      <Testimonial/>
      </div>
      </section>

    {/*what's our patient doctors end */}

    </>
  )
}

export default Doctors
