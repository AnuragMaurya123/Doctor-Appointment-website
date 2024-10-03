import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import axios from "axios";
import { BACKEND_URL } from '../../utils/BaseUrl';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ProfileSetting = ({user}) => {
  const navigate=useNavigate()
    const { token,dispatch } = useContext(AuthContext);
    const [imageAvater, setImageAvater] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [password, setPassword] = useState("");
    const [bloodType, setBloodType] = useState("");
  
    useEffect(() => {
        setName(user?.name || ""); 
        setEmail(user?.email || ""); 
        setGender(user?.gender || "male"); 
        setBloodType(user?.bloodType || ""); 
    }, [user]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const inputData=new FormData()
          inputData.append("name",name)
          inputData.append("email",email)
          inputData.append("password",password)
          inputData.append("gender",gender)
          inputData.append("bloodType",bloodType)
          inputData && inputData.append("photo",imageAvater)

            const response = await axios.put(
                `${BACKEND_URL}/api/users/${user._id}`,
                inputData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        
                    },
                }
            );

            
            if (response.data.success) {
                toast.success(response.data.message || "Profile updated successfully");
                dispatch({
                  type: "UPDATE_USER",
                  payload:{
                    user:response.data.data,
                    role:response.data.data.role,
                    token:response.data.token,
                  }
                })
                navigate(`/users/profile/${response.data.data.name}`)
                
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            if (error.message === "Request failed with status code 401") {
                console.log(error);
                toast.error(error.response.data.message)
                setError(error.response.data.message)
              }else{
              toast.error(error.message)
              setError(error.message)
              console.log(error);
              }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-5">
                <input
                    autoComplete='on' 
                    type="text" 
                    placeholder='Enter your full name' 
                    className='w-full mb-2 pr-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
                    cursor-pointer'
                    name='name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                   
                />
            </div>
            <div className="mb-5">
                <input
                    autoComplete='on' 
                    type="email" 
                    placeholder='Enter your email' 
                    className='w-full mb-2 pr-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
                    cursor-pointer'
                    name='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    aria-readonly
                    readOnly
                  
                />
            </div>

            <div className="mb-5">
                <input
                    autoComplete='on' 
                    type="password" 
                    placeholder='Enter new password to change' 
                    className='w-full mb-2 pr-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
                    cursor-pointer'
                    name='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                   
                />
            </div>

            <div className="mb-5">
                <input
                    autoComplete='on' 
                    type="text" 
                    placeholder='Enter your Blood Type' 
                    className='w-full mb-2 pr-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor 
                    cursor-pointer'
                    name='bloodType' 
                    value={bloodType} 
                    onChange={(e) => setBloodType(e.target.value)}
                   
                />
            </div>

            <div className="mt-5 mb-5 flex items-center justify-between">
                <label className='text-headingColor font-bold text-[16px] leading-7'>
                    Gender: 
                    <select value={gender} onChange={(e) => setGender(e.target.value)} name="gender" className="text-textColor 
                    font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
            </div>
            

            <div className="mb-5 flex items-center gap-3">
           {imageAvater &&  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid
               border-primaryColor flex items-center justify-center">
                <img src={ URL.createObjectURL(imageAvater)} alt="" className='w-full rounded-full' />
               </figure>
           }
                <div className="relative w-[130px] h-[50px]">
                    <input 
                        type="file" 
                        name='photo' 
                        onChange={(e) => setImageAvater(e.target.files[0])}
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
                <button className="w-full bg-primaryColor py-3 text-white font-semibold text-[15px] leading-6 rounded-lg" 
                type="submit">
                    {loading ? <HashLoader color="#fff" size={20} /> : "Update Profile"}
                </button>
            </div>
        </form>
    );
};

export default ProfileSetting;
