import React, { useEffect, useState } from "react";
import avatar from "../../assets/pictures/avatar.jpg";
import { useNavigate } from "react-router-dom";
import { HourFormat } from "../../helpers/HourCustom";
import apiBackEndUser from "../../api/backend/api.BackendUser";
import NoteOneStar from "../NoteOneStar";
import { dateWithoutDetailDay } from "../../helpers/DateWithoutDetailDay";
import { durationCalcule } from '../../helpers/durationCalcule';
import { getImageProfileById } from "../../api/backend/account";

const CardCarrousel = ({ carrousel }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const userId = carrousel.user.id;

  const endTime = carrousel.itinerary.arrivedTime; 
  const startTime = carrousel.hour; 
  const duration = durationCalcule(startTime, endTime);


  useEffect(() => {
    apiBackEndUser.get(`note/${userId}`).then((res) => {
      setNote(res.data);
    });
  });

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
    <div
      className="h-auto sm:w-[650px] xs:w-[400px] bg-[#F5F8F5] border border-gray-400 rounded-lg flex flex-col
         hover:bg-[#FFF9D8] cursor-pointer p-2"
      onClick={() => navigate(`/itinerary-detail/${carrousel.id}`)}
    >
      <div className="flex items-center justify-center gap-1 font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        <p className="text-xs">
          {dateWithoutDetailDay(carrousel.dateStarting)}
        </p>
      </div>
      <div className="flex -mt-3">
        {/* PROFILE */}
        <div className="w-28 flex flex-col items-center justify-center gap-1 font-bold mt-2">
          {/* AVATAR */}
          <div className="avatar">
            <div className="w-14 h-14 rounded-xl ">
              <img src={profile ? profile : avatar} />
            </div>
          </div>
          {/* NUMBER OF STARS */}
          <NoteOneStar note={note} />
        </div>

        {/* ITINARY */}
        <div className="h-28 flex-1 flex justify-center items-center">
          {/* CITY START */}
          <div className="flex flex-col items-center mr-2">
            <p className="font-bold text-lg">{carrousel.itinerary.cityStart}</p>
            <p className="font-semibold">{HourFormat(carrousel.hour)}</p>
          </div>
          {/* VISUALISATION AND HOUR */}
          <div className="flex mb-5">
            {window.innerWidth > 500 &&
            <div className="h-3 w-3 rounded-xl bg-black"></div>
            }
            <div className="container h-0.5 sm:w-52 xs:w-10 my-auto border border-black bg-black">
              {window.innerWidth > 500 &&
              <p className="text-center font-bold mt-2">{duration} de trajet</p>
              }
            </div>
            {window.innerWidth > 500 &&
            <div className="h-3 w-3 rounded-xl bg-black"></div>
            }
          </div>
          {/* CITY END */}
          <div className="flex flex-col items-center ml-2">
            <p className="font-bold text-lg">{carrousel.itinerary.cityEnd}</p>
            <p className="font-semibold">{HourFormat(carrousel.itinerary.arrivedTime)}</p>
          </div>
        </div>
   
        {/* CREDITS / AVAILABLE SEAT */}
        <div className="w-28 flex flex-col items-center justify-center gap-2 font-bold mt-1">
          {/* CREDITS */}
          <div className="flex flex-col items-center">
            <p>{carrousel.price}</p>
            <p className="-mt-1">crédits</p>
          </div>
          {/* AVAILABLE SEAT */}
          <div className="flex items-center gap-1">
            <p>{carrousel.placeAvailable}</p>
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
    </div>
  );
};

export default CardCarrousel;
