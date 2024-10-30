import React, { useContext, useState } from 'react';
import Image from "../assets/images/signup.gif";
import avatar from "../assets/images/profile.webp";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/BaseUrl';
import { AuthContext } from '../context/authContext';

const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    gender: "male",
  });

  const handleInputValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inputData = new FormData();
      inputData.append("name", formData.name);
      inputData.append("email", formData.email);
      inputData.append("password", formData.password);
      inputData.append("role", formData.role);
      inputData.append("gender", formData.gender);

      if (imageAvatar) {
        inputData.append("photo", imageAvatar);
      }

      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, inputData);
      if (response.data.success) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: response.data.data,
            role: response.data.data.role,
            token: response.data.token,
          }
        });
        navigate("/");
        toast.success("Registered & Logged in Successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred during registration";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block bg-primaryColor rounded-l-lg">
              <figure className="rounded-l-lg">
                <img src={Image} alt="Signup Illustration" className='w-full rounded-l-lg' />
              </figure>
            </div>
            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-primaryColor">Account</span>
              </h3>
              <form onSubmit={onSubmit}>
                <div className="mb-5">
                  <input
                    autoComplete='on'
                    type="text"
                    placeholder='Enter your full name'
                    className='w-full mb-2 pr-3 py-3 border-b focus:outline-none focus:border-b-primaryColor'
                    name='name'
                    value={formData.name}
                    onChange={handleInputValue}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    autoComplete='on'
                    type="email"
                    placeholder='Enter your email'
                    className='w-full mb-2 pr-3 py-3 border-b focus:outline-none focus:border-b-primaryColor'
                    name='email'
                    value={formData.email}
                    onChange={handleInputValue}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    autoComplete='on'
                    type="password"
                    placeholder='Enter your password'
                    className='w-full mb-2 pr-3 py-3 border-b focus:outline-none focus:border-b-primaryColor'
                    name='password'
                    value={formData.password}
                    onChange={handleInputValue}
                    required
                  />
                </div>
                <div className="mt-5 mb-5 flex items-center justify-between">
                  <label className='text-headingColor font-bold'>
                    Are you a:
                    <select
                      value={formData.role}
                      onChange={handleInputValue}
                      name="role"
                      className="ml-2 px-4 py-3 focus:outline-none"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>
                  <label className='text-headingColor font-bold'>
                    Gender:
                    <select
                      value={formData.gender}
                      onChange={handleInputValue}
                      name="gender"
                      className="ml-2 px-4 py-3 focus:outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <div className="mb-5 flex items-center gap-3">
                  <figure className="w-[60px] h-[60px] rounded-full border-2 flex items-center justify-center">
                    <img src={imageAvatar ? URL.createObjectURL(imageAvatar) : avatar} alt="Avatar Preview" className='w-full rounded-full' />
                  </figure>
                  <div className="relative w-[130px] h-[50px]">
                    <input
                      type="file"
                      name='photo'
                      onChange={(e) => setImageAvatar(e.target.files[0])}
                      id='customFile'
                      accept='.jpg, .png'
                      className='absolute w-full h-full opacity-0 cursor-pointer'
                    />
                    <label htmlFor="customFile" className='absolute w-full h-full flex items-center px-3 py-1.5 text-[15px] bg-[#0066ff46] rounded-lg cursor-pointer'>
                      Upload Photo
                    </label>
                  </div>
                </div>
                <div className="mt-7">
                  <button
                    className="w-full bg-primaryColor text-white text-[18px] rounded-lg py-3 px-4"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <HashLoader size={30} color='#fff' /> : "Register"}
                  </button>
                </div>
                <p className="mt-5 text-center">
                  Already have an Account? <Link className='text-primaryColor font-medium ml-1' to={"/login"}>Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
