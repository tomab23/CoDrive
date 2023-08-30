import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiBackEndAdmin from '../../../api/backend/apiBackendAdmin';
import Input from '../../Custom/Input';
import cardAdmin from './CardAdmin';



function Search() {
  const [reference, setReference] = useState('');
  const [travels, setTravels] = useState([]);

  const handleInputChange = (e) => {
    const reference = e.target.value;
    setReference(reference);

   apiBackEndAdmin.get(`/search?reference=${reference}`).then(travels => setTravels(travels.data)).catch(e=>{
    console.log(e.code);
   })
   console.log(travels);
  }
  return (
    <div className="p-5 flex justify-center items-center">   
      <div> 
      <Input className='p-3 w-96 rounded-lg border' value={reference} type="search" placeholder="Rechercher un trajet"  onChange={e => handleInputChange(e)}  />
      <div>
      {travels.map((travel) => (
            <Link  key={travel.id} to={`/itinerary-detail/${travel.id}`}>
              <p className='hover:text-lg ml-3'>{travel.reference}</p>
            </Link>      
        ))}

        </div> 
      </div> 
    </div>
  );
}

export default Search