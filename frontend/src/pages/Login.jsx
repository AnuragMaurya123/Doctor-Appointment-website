import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleInputValue=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const onSubmit=async (e)=>{
    e.preventDefault();
  }
  return (
    <section className='px-5 lg:px-0'>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-panelShadow md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">Hello! <span className="text-primaryColor ">Welcome
          </span> Back 🎉</h3>

          <form onSubmit={onSubmit} className='px-5 lg:px-0'>

            <div className="mb-5">
              <input autoComplete='on' 
              type="email" 
              placeholder='Enter you email' 
              className='w-full mb-2  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
               cursor-pointer'
              name='email' 
              value={formData.email} 
              onChange={handleInputValue}
              required
               />


              <input 
              autoComplete='on' 
              type="password" 
              placeholder='Enter you password' 
              className='w-full  mb-2  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
              cursor-pointer'
              name='password' 
              value={formData.password} 
              onChange={handleInputValue}
              required
               />
            </div>

          <div className="mt-7">
          <button className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3 px-4"
             type="submit">
              Login
              </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don't have Account? <Link className='text-primaryColor font-medium ml-1' to={"/register"}>register</Link>
          </p>
          </form>
      </div>
    </section>
  )
}

export default Login
