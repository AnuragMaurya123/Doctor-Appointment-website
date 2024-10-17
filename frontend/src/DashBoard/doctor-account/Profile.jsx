  import React, { useContext, useEffect, useState } from "react";
  import { MdDelete } from "react-icons/md";
  import HashLoader from "react-spinners/HashLoader";
  import { BACKEND_URL } from "../../utils/BaseUrl";
  import { AuthContext } from "../../context/authContext";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-toastify";
  const Profile = ({ doctor }) => {
    const navigate = useNavigate();
    const { token, dispatch } = useContext(AuthContext);

    //for image upload
    const [imageAvater, setImageAvater] = useState(false);
    const [loading, setLoading] = useState(false);
    //for form input
    const [fromData, setFromData] = useState({
      name: doctor?.name|| "",
      email:doctor?.email||  "",
      phone:doctor?.phone|| "",
      password:"",
      bio:doctor?.bio|| "",
      gender: doctor?.gender||"",
      specialization:doctor?.specialization|| "",
      ticketPrice:doctor?.ticketPrice|| 0,
      experiences:doctor?.experiences || [
        { startingDate: "", endingDate: "", position: "", hospitial: "" },
      ],
      qualifications:doctor?.qualifications|| [
        { startingDate: "", endingDate: "", degree: "", university: "" },
      ],
      timeSlots:doctor?.timeSlots|| [{ day: "", startingTime: "", endingTime: "" }],

      about:doctor?.about|| "",
    });

    
    

    const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const inputData = new FormData();
        inputData.append("name", fromData.name);
        inputData.append("email", fromData.email);
        inputData.append("password", fromData.password);
        inputData.append("phone", fromData.phone);
        inputData.append("about", fromData.about);
        inputData.append("gender", fromData.gender);
        inputData.append("bio", fromData.bio);
        inputData.append("specialization", fromData.specialization);
        inputData.append("ticketPrice", fromData.ticketPrice);

        fromData.experiences.forEach((experience, index) => {
          // Loop through each property of the experience object
          Object.keys(experience).forEach((key) => {
            // Append each key-value pair to FormData
            inputData.append(`experiences[${index}][${key}]`, experience[key]);
          });
        });

        fromData.qualifications.forEach((qualification, index) => {
          // Loop through each property of the qualification object
          Object.keys(qualification).forEach((key) => {
            // Append each key-value pair to FormData
            inputData.append(
              `qualifications[${index}][${key}]`,
              qualification[key]
            );
          });
        });

        fromData.timeSlots.forEach((timeSlot, index) => {
          // Loop through each property of the timeSlot object
          Object.keys(timeSlot).forEach((key) => {
            // Append each key-value pair to FormData
            inputData.append(`timeSlots[${index}][${key}]`, timeSlot[key]);
          });
        });
        inputData && inputData.append("photo", imageAvater);

        const response = await axios.put(
          `${BACKEND_URL}/api/doctors/${doctor._id}`,
          inputData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          toast.success(response.data.message || "Profile updated successfully");
          dispatch({
            type: "UPDATE_USER",
            payload: {
              user: response.data.data,
              role: response.data.data.role,
              token: token,
            },
          });
          navigate(`/doctors/profile/${response.data.data.name}`);
        } else {
          toast.error(response.data.message || "Failed to update profile");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    //handle form input
    const handleInputChange = (e) => {
      setFromData({
        ...fromData,
        [e.target.name]: e.target.value,
      });
    };

    // reusable function for add items in experiences ,qualifications, timeSlots
    const addItem = (key, item) => {
      setFromData((prevFromData) => ({
        ...prevFromData,
        [key]: [...prevFromData[key], item],
      }));
    };
    // reusable function for delete items in experiences ,qualifications, timeSlots
    const deleteItem = (key, index) => {
      setFromData((prevFromData) => ({
        ...prevFromData,
        [key]: prevFromData[key].filter((_, i) => i !== index),
      }));
    };

    // reusable input change functions for  experiences ,qualifications, timeSlots
    const handleReusableInputFunction = (key, index, e) => {
      const { name, value } = e.target;
      setFromData((prevFromData) => {
        const updateItems = [...prevFromData[key]];
        updateItems[index][name] = value;

        return {
          ...prevFromData,
          [key]: updateItems,
        };
      });
    };

    // add multiple Experiences section
    const addExperiences = (e) => {
      e.preventDefault();
      addItem("experiences", {
        startingDate: "",
        endingDate: "",
        position: "",
        hospitial: "",
      });
    };

    // delete singlr Experiences section
    const deleteExperiences = (e, index) => {
      e.preventDefault();
      deleteItem("experiences", index);
    };

    // handle Experiences section input
    const handleExperiencesInputs = (e, index) => {
      handleReusableInputFunction("experiences", index, e);
    };

    // add multiple Qualifications section
    const addQualifications = (e) => {
      e.preventDefault();
      addItem("qualifications", {
        startingDate: "",
        endingDate: "",
        degree: "",
        university: "",
      });
    };

    // delete single Qualifications section
    const deleteQualifications = (e, index) => {
      e.preventDefault();
      deleteItem("qualifications", index);
    };

    // handle Qualifications section input
    const handleQualificationsInput = (e, index) => {
      handleReusableInputFunction("qualifications", index, e);
    };

    // add multiple TimeSlots section
    const addTimeSlots = (e) => {
      e.preventDefault();
      addItem("timeSlots", {
        day: "",
        startingTime: "",
        endingTime: "",
      });
    };

    // delete single TimeSlots section
    const deleteTimeSlots = (e, index) => {
      e.preventDefault();
      deleteItem("timeSlots", index);
    };

    // handle Time Slots section input
    const handleTimeSlotsInputs = (e, index) => {
      handleReusableInputFunction("timeSlots", index, e);
    };

    return (
      <div>
        <h2 className="text-headingColor  font-bold text-[24px] leading-9 mb-10">
          Profile Information
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <p className="form_label">Name*</p>
            <input
              type="text"
              name="name"
              value={fromData.name}
              className="from_input"
              placeholder="Full Name"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <p className="form_label">Email*</p>
            <input
              type="email"
              name="email"
              value={fromData.email}
              className="from_input"
              placeholder="Email"
              onChange={handleInputChange}
              aria-readonly
              readOnly
            />
          </div>

          <div className="mb-5">
            <p className="form_label">Password*</p>
            <input
              type="password"
              name="password"
              value={fromData.password}
              className="from_input"
              placeholder="Enter New Password To Change You Password "
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          <div className="mb-5">
            <p className="form_label">Phone Number*</p>
            <input
              type="number"
              name="phone"
              value={fromData.phone}
              className="from_input"
              placeholder="Phone Number"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <p className="form_label">Bio*</p>
            <input
              type="text"
              name="bio"
              value={fromData.bio}
              className="from_input"
              placeholder="Write Your Short Introduction."
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <div className="grid grid-cols-3 gap-5 mb-[30px]">
              <div>
                <p className="form_label">Gender*</p>
                <select
                  className="from_input"
                  name="gender"
                  value={fromData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <p className="form_label">Specialization*</p>
                <input
                  className="from_input"
                  name="specialization"
                  value={fromData.specialization}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <p className="form_label">Ticket Price*</p>
                <input
                  type="number"
                  name="ticketPrice"
                  value={fromData.ticketPrice}
                  className="from_input"
                  placeholder="100"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="form_label mb-3">Qualifications*</p>
            {fromData.qualifications?.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="from_input"
                      onChange={(e) => handleQualificationsInput(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="from_input"
                      onChange={(e) => handleQualificationsInput(e, index)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="from_input"
                      onChange={(e) => handleQualificationsInput(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="from_input"
                      onChange={(e) => handleQualificationsInput(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteQualifications(e, index)}
                  className="bg-red-600 text-white rounded-full p-2 text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              onClick={addQualifications}
              className="bg-black text-white rounded-md py-2 px-5 h-fit cursor-pointer "
            >
              Add Qualifications
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label mb-3">Experiences*</p>
            {fromData.experiences?.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="from_input"
                      onChange={(e) => handleExperiencesInputs(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="from_input"
                      onChange={(e) => handleExperiencesInputs(e, index)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="from_input"
                      onChange={(e) => handleExperiencesInputs(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Hospitial*</p>
                    <input
                      type="text"
                      name="hospitial"
                      value={item.hospitial}
                      className="from_input"
                      onChange={(e) => handleExperiencesInputs(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteExperiences(e, index)}
                  className="bg-red-600 text-white rounded-full p-2 text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              onClick={addExperiences}
              className="bg-black text-white rounded-md py-2 px-5 h-fit cursor-pointer"
            >
              Add Experiences
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label mb-3">Time Solt*</p>
            {fromData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 lg:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form_label">Day*</p>
                    <select
                      className="from_input py-4"
                      name="day"
                      value={item.day}
                      onChange={(e) => handleTimeSlotsInputs(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday </option>
                      <option value="friday">Friday</option>
                      <option value="saturday ">Saturday </option>
                      <option value="sunday ">Sunday </option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="from_input"
                      onChange={(e) => handleTimeSlotsInputs(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="from_input"
                      onChange={(e) => handleTimeSlotsInputs(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlots(e, index)}
                      className="bg-red-600 text-white rounded-full p-2 text-[18px] mt-6  cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addTimeSlots}
              className="bg-black text-white rounded-md py-2 px-5 h-fit cursor-pointer"
            >
              Add Time Solt
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label">About*</p>
            <textarea
              placeholder="write about you"
              name="about"
              value={fromData.about}
              rows={5}
              className="from_input"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {imageAvater && (
              <figure
                className="w-[60px] h-[60px] rounded-full border-2 border-solid
                border-primaryColor flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(imageAvater)}
                  alt=""
                  className="w-full rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                onChange={(e) => setImageAvater(e.target.files[0])}
                id="customFile"
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 
                      w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
                      bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>

          <div className="mb-7">
            <button
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3 px-4"
              type="submit"
            >
              {loading ? <HashLoader size={30} color="#fff" /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default Profile;
