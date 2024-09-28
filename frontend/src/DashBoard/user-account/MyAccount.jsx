import React, { useContext, useState } from 'react';
import image from "../../assets/images/doctor-img01.png";
import { AuthContext } from '../../context/authContext';
import MyBooking from './MyBooking';
import ProfileSetting from './ProfileSetting';
import useFetchData from '../../hooks/useFetchData';
import { BACKEND_URL } from '../../utils/BaseUrl';
import Loading from '../../component/Loading/Loading';
import Errorl from '../../component/Error/Error';

const MyAccount = () => {
  const [toggle, settoggle] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const { data:user, loading, error } = useFetchData(`${BACKEND_URL}/api/users/profile/me`);

  // Function to handle user logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className='max-w-[1170px] mt-16 mx-auto px-5'>
      {loading && !error && <Loading />}
      {error && !loading && <Errorl errorMessage={error} />}
      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor ">
                <img src={image} alt="User Profile" className="w-full h-full rounded-full" />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{user?.name || "User Name"}</h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">{user?.email || "example@gmail.com"}</p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                Blood Type:
                <span className="ml-2 text-headingColor text-[15px] leading-8 ">
                  {user?.bloodType || "O-"}
                </span>
              </p>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
              <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] rounded-md leading-7 text-white">Logout</button>
              <button className="w-full bg-red-600 p-3 text-[16px] rounded-md leading-7 mt-4 text-white">Delete Account</button>
            </div>
          </div>
          <div className="md:col-span-2 md:px-[30px]">
            <button
              onClick={() => settoggle(false)}
              className={`${!toggle ? "bg-primaryColor text-white" : "text-headingColor"} p-2 mr-5 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              aria-label="My Booking"
            >
              My Booking
            </button>
            <button
              onClick={() => settoggle(true)}
              className={`${toggle ? "bg-primaryColor text-white" : "text-headingColor"} p-2 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              aria-label="Profile Setting"
            >
              Profile Setting
            </button>

            {toggle ? <ProfileSetting user={user} /> : <MyBooking />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
