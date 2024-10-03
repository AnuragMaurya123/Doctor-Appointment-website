import { BACKEND_URL } from "../../utils/BaseUrl"
import DoctorCart from "../../component/Doctors/DoctorCart"
import useFetchData from "../../hooks/useFetchData"
import Error from "../../component/Error/Error"
import Loading from "../../component/Loading/Loading"
import Errorl from '../../component/Error/Error'


const MyBooking = () => {
  const {data:appointment ,loading, error}=useFetchData(BACKEND_URL+"/api/users/appointment/my-appointment")

 
  return (
    <div>
       {loading && !error && <Loading/>}

      {error && !loading && <Errorl errorMessage={error}/>}

      {!loading && !error && <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {
      appointment.map(doctor=>(
        <DoctorCart doctor={doctor}  key={doctor._id}/>
      ))
      }
</div>
       }
       
      {!loading && !error && appointment.length === 0 && 
      <h2 className=" mt-5 text-center  leading-7 text-[20px] font-semibold text-primaryColor"> You did not book any appointment yet</h2>}
    
    </div>
  )
}

export default MyBooking
