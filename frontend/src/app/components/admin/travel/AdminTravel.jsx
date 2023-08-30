import React, { useEffect, useState } from 'react'
import CardAdmin from './CardAdmin'
import { getTravelAdmin } from '../../../api/backend/account';
import Search from './Search';
import TravelTestKmHour from '../testKm/TravelTestKmHour';
import TitleAdmin from '../TitleAdmin';

const AdminTravel = () => {
  const [travels, setTravels] = useState([]);
  const [error, setError] = useState(false);
  const [city, setCity] = useState([]);


// console.log(travels);

  useEffect(() => {
    setError(false);
    getTravelAdmin()
      .then((travels) => {
        setTravels(travels.data)
        setCity(travels.data.itinerary)
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === 'ERR_NETWORK') {
          setError(true);
        }
      });
  }, []);

  

  return (
    <div>
      <TitleAdmin title={"Trajets"}  className={`mb-3`}/>
      <Search />
      <div className='grid lg:grid-cols-2 gap-5  bg-white border border-neutral-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-10 
      sm:flex-row sm:items-center'>
      {travels.map((travels) => (
         <CardAdmin  travels={travels} key={travels.id} />

     ))}
      </div>
   
    
    </div>
  );
};

export default AdminTravel;

