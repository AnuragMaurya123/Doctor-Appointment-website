import React, { useEffect, useState } from 'react';
import DoctorCart from '../../component/Doctors/DoctorCart';
import Testimonial from '../../component/Testimonial/Testimonial';
import { BACKEND_URL } from '../../utils/BaseUrl';
import Loading from '../../component/Loading/Loading';
import Error from '../../component/Error/Error';
import useFetchData from '../../hooks/useFetchData';

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false); // New state for debouncing

  
  const handleSearch = () => {
    // Trim query when search button is clicked
    setQuery(query.trim());
  };
  
  // Debounce effect to reduce API calls for each keystroke
  useEffect(() => {
    setIsDebouncing(true); // Debouncing starts
    
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
      setIsDebouncing(false); // Debouncing ends
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [query]);


  // Fetch doctor data based on debounceQuery
  const { data: doctors, loading, error } = useFetchData(`${BACKEND_URL}/api/doctors?query=${debounceQuery}`);
  
  
  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>

          {/* Search input */}
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search here'
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Doctors list */}
      <section>
        {/* Show loading during the debounce period */}
        {(loading || isDebouncing) && <Loading />}
        {error && !loading && !isDebouncing && <Error errorMessage={error} />}

        <div className="container">
          {!loading && !error && !isDebouncing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors.map(doctor => (
                <DoctorCart doctor={doctor} key={doctor._id} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What our patients say */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text-para text-center">World-class care for everyone. Our health system offers unmatched services.</p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
