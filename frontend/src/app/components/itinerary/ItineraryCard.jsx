import React, { useEffect, useState } from 'react'
import avatar from '../../assets/pictures/avatar.jpg'
import { useNavigate } from 'react-router-dom';
import { HourFormat } from '../../helpers/HourCustom';
import apiBackEndUser from '../../api/backend/api.BackendUser';
import NoteOneStar from '../NoteOneStar';
import { durationCalcule } from '../../helpers/durationCalcule';
import { getImageProfileById } from '../../api/backend/account'; 

const ItineraryCard = ({travels, search}) => {

  const navigate = useNavigate();

  const userId = travels.user.id;
  const [note, setNote] = useState(null)

  const endTime = travels.itinerary.arrivedTime; 
  const startTime = travels.hour; 
  const duration = durationCalcule(startTime, endTime);

  useEffect(() => {
    apiBackEndUser.get(`note/${userId}`)
    .then((res) => {
      // console.log("res", res);
      setNote(res.data)
    })
  })

  const infoDetails = () => {
    navigate(`/itinerary-detail/${travels.id}`, {state: search})
  }

 // {GESTION DES IMAGES}
 const [profile, setProfile] = useState();

 //RECUPERE IMAGE PROFILE
 useEffect(() => {
   getImageProfileById(userId)
     .then((res) => {
       setProfile(res.data.image);
     })
     .catch((error) => {
       console.error("Error fetching profile image:", error);
     });
 }, []);
  
    return (
        <div className="h-auto sm:w-[680px] xs:w-[400px] bg-[#F5F8F5] border border-gray-400 rounded-lg flex
         hover:bg-hover-card cursor-pointer sm:p-2"
         onClick={infoDetails}>
          {/* PROFILE */}
          <div className="w-28 flex flex-col items-center justify-center gap-1 font-bold mt-2">
            {/* AVATAR */}
            <div className="avatar">
              <div className="w-14 h-14 rounded-xl ">
                <img src={profile ? profile : avatar}/>
              </div>
            </div>
            {/* NUMBER OF STARS */}
<NoteOneStar note={note} />
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
              <div className="container h-0.5 sm:w-72 xs:w-10 my-auto border border-black bg-black">
                {window.innerWidth < 500 ? 
                <p className="text-center font-bold mt-2">{duration}</p> 
              :
                <p className="text-center font-bold mt-2">{duration} de trajet</p>}
              </div>
              <div className="h-3 w-3 rounded-xl bg-black"></div>
            </div>
            {/* CITY END */}
            <div className="flex flex-col items-center ml-2">
              <p className="font-bold text-lg">{travels.itinerary.cityEnd}</p>
              <p className="font-semibold">{HourFormat(travels.itinerary.arrivedTime)}</p>
            </div>
          </div>
    
          {/* CREDITS / AVAILABLE SEAT */}
          <div className="w-28 flex flex-col items-center justify-center gap-2 font-bold mt-1">
            {/* CREDITS */}
            <div className="flex flex-col items-center">
              <p>{travels.price}</p>
              <p className="-mt-1">crédits</p>
            </div>
            {/* AVAILABLE SEAT */}
            <div className="flex items-center gap-1">
              <p>{travels.placeAvailable}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      );
}

export default ItineraryCard
