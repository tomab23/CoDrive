import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HourFormat } from '../../../helpers/HourCustom';


const cardAdmin = ({travels, search}) => {

  const navigate = useNavigate();

  const userId = travels.user.id;

console.log(travels.id);

  
    return (
        <div className="h-auto w-[680px] bg-[#F5F8F5] border border-gray-400 rounded-lg flex
         hover:bg-hover-card cursor-pointer p-2"
         onClick={() => navigate(`/itinerary-detail/${travels.id}`)}>
          {/* PROFILE */}
          <div className="w-28 flex flex-col items-center justify-center gap-1 font-bold mt-2">
            {/* AVATAR */}
            <div className="avatar">
              <div className="w-14 h-14 rounded-xl ">
               <p>Ref {travels.reference}
               </p>
              </div>
            </div>
          </div>
    
          {/* ITINARY */}
          <div className="h-28 flex-1 flex justify-center items-center">
            {/* CITY START */}
            <div className="flex flex-col items-center mr-2">
              <p className="font-bold text-lg">{travels.itinerary.cityStart}</p>
              <p className="font-semibold">{HourFormat(travels.hour)}</p>
            </div>
            {/* VISUALISATION AND HOUR */}
            <div className="flex mb-5">
              <div className="h-3 w-3 rounded-xl bg-black"></div>
              <div className="container h-0.5 w-72 my-auto border border-black bg-black">
                <p className="text-center font-bold mt-2">1h00 de trajet</p>
              </div>
              <div className="h-3 w-3 rounded-xl bg-black"></div>
            </div>
            {/* CITY END */}
            <div className="flex flex-col items-center ml-2">
              <p className="font-bold text-lg">{travels.itinerary.cityEnd}</p>
              <p className="font-semibold">...</p>
            </div>
          </div>
        </div>
      );
}

export default cardAdmin
