
import DoctorCart from './DoctorCart'
import { BACKEND_URL } from '../../utils/BaseUrl';
import Loading from '../../component/Loading/Loading';
import Error from '../../component/Error/Error';
import useFetchData from '../../hooks/useFetchData';

const DoctorsList = () => {
 
  const { data:doctors, loading, error } = useFetchData(`${BACKEND_URL}/api/doctors`);
 
  
  return <div>
  {loading && !error && <Loading/>}

{error && !loading && <Error errorMessage={error}/>}

{!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
{
doctors.map(doctor=>(
  <DoctorCart doctor={doctor}  key={doctor._id}/>
))
}
</div>
 }
</div>
}

export default DoctorsList
