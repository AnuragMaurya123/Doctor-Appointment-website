import React, { useContext, useState } from 'react'
import Image from "../assets/images/signup.gif"
import avatar from "../assets/images/profile.webp"
import { Link } from 'react-router-dom'
import axios from "axios"
import HashLoader from "react-spinners/HashLoader"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../utils/BaseUrl'
import { AuthContext } from '../context/authContext'
const Signup = () => {
  const navigate=useNavigate()
  const {dispatch} =useContext(AuthContext)
  const [imageAvater, setImageAvater] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fromData, setFromData] = useState({
    name:"",
    email:"",
    password:"",
    role:"patient",
    gender:"male",
  })
    
  const handleInputValue=(e)=>{
    setFromData({...fromData,[e.target.name]:e.target.value})
  }


  const onSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const inputData=new FormData()
      inputData.append("name",fromData.name)
      inputData.append("email",fromData.email)
      inputData.append("password",fromData.password)
      inputData.append("role",fromData.role)
      inputData.append("gender",fromData.gender)
      inputData && inputData.append("photo",imageAvater)

      const response=await axios.post(BACKEND_URL+"/api/auth/register",inputData)
  
      if (response.data.success) { 
        dispatch({
          type:"LOGIN_SUCCESS",
          payload:{
            user:response.data.data,
            role:response.data.data.role,
            token:response.data.token,
          }
      })
      navigate("/")
      toast.success("Login Successfully")
      } else {
       toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }finally {
      setLoading(false);
  }
  }


  return (
    <section>
    <div className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* image box */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={Image} alt="" className='w-full  rounded-l-lg' />
            </figure>
          </div>

          <div className="rounded-l-lg  lg:pl-16 py-10">

            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">Account</span>
            </h3>

            <form onSubmit={onSubmit}>
            <div className="mb-5">
              <input autoComplete='on' 
              type="text" 
              placeholder='Enter you full name' 
              className='w-full mb-2 pr-3  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
               cursor-pointer'
              name='name' 
              value={fromData.name} 
              onChange={handleInputValue}
              required
               />
            </div>
            <div className="mb-5">
              <input autoComplete='on' 
              type="email" 
              placeholder='Enter you email' 
              className='w-full mb-2 pr-3  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
               cursor-pointer'
              name='email' 
              value={fromData.email} 
              onChange={handleInputValue}
              required
               />
            </div>

            <div className="mb-5">
              <input autoComplete='on' 
              type="password" 
              placeholder='Enter you password' 
              className='w-full mb-2 pr-3  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
               cursor-pointer'
              name='password' 
              value={fromData.password} 
              onChange={handleInputValue}
              required
               />
            </div>

            <div className="mt-5 mb-5 flex items-center justify-between">
              <label  className='text-headingColor font-bold text-[16px] leading-7'>
                Are you a: 
                <select value={fromData.role} onChange={handleInputValue} name="role" className="text-textColor
                 font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                 </select>
              </label>

              <label  className='text-headingColor font-bold text-[16px] leading-7'>
               Gender: 
                <select value={fromData.gender} onChange={handleInputValue} name="gender" className="text-textColor 
                font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                 </select>
              </label>
            </div>
            <div className="mb-5 flex items-center gap-3">
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid
               border-primaryColor flex items-center justify-center">
                <img src={imageAvater ? URL.createObjectURL(imageAvater):avatar} alt="" className='w-full rounded-full' />
               </figure>

               <div className="relative w-[130px] h-[50px]">
                <input 
                type="file" 
                name='photo' 
                onChange={(e)=>setImageAvater(e.target.files[0])}
                id='customFile' 
                accept='.jpg, .png'
                className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />
                <label htmlFor="customFile" className='absolute top-0 left-0 
                w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
                bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo</label>
               </div>
            </div>

            <div className="mt-7">
          <button className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3 px-4"
             type="submit">
             {loading? <HashLoader size={30} color='#fff'/>: "Register"}
              </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Already have an Account? <Link className='text-primaryColor font-medium ml-1' to={"/login"}>Login</Link>
          </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
  )
}

export default Signup
