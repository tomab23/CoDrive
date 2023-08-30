import React, { useEffect, useState } from "react";
import avatar from "../../assets/pictures/avatar.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import NoteOneStar from './../NoteOneStar';
import { durationCalcule } from '../../helpers/durationCalcule';
import { dateWithoutDetailDay } from "../../helpers/DateWithoutDetailDay";
import { getNumberOfBooking } from "../../api/backend/account";
import { HourFormat } from "../../helpers/HourCustom";
import { getImageProfileById } from "../../api/backend/account";

const CardAdminTravel = ({travel}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [numberBooking, setNumberBooking] = useState()
  
  const endTime = travel.itinerary.arrivedTime; 
  const startTime = travel.hour; 
  const duration = durationCalcule(startTime, endTime);

  const placeStart = (travel.placeAvailable + numberBooking);

  useEffect(() => {
    getNumberOfBooking(travel.id)
    .then((res) => {
      setNumberBooking(res.data);
    })
  }, [])

  const detailsInfo = () => {
    navigate(`/itinerary-detail/${travel.id}`);
  }

 // {GESTION DES IMAGES}
 const [profile, setProfile] = useState();

 //RECUPERE IMAGE PROFILE
 useEffect(() => {
  getImageProfileById(travel.user.id)
     .then((res) => {
       setProfile(res.data.image);
     })
     .catch((error) => {
       console.error("Error fetching profile image:", error);
     });
 }, []);

  return (
    <div
      className="h-auto bg-[#F5F8F5] border border-gray-400 rounded-lg flex
    hover:bg-[#FFF9D8] cursor-pointer p-2  m-5 justify-between items-start"
    onClick={detailsInfo}
    >
      <div className="flex flex-col mr-2 items-center justify-center gap-1 mt-2 ">
        <div className="avatar">
          <div className="w-14 h-14 rounded-xl gap-1 ">
          <img src={profile ? profile : avatar}/>
  </div>
        </div>
        {/* NUMBER OF STARS */}
        <NoteOneStar note={location.state.note} />
        <p>{travel.reference}</p>
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2">
        <div className="flex">
          <p className="flex items-center font-semibold">Nom:</p>
          <p className="ml-2">{travel.user.lastname}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Prenom:</p>
          <p className="ml-2">{travel.user.firstname}</p>
        </div>
       <div className="flex">
       <p className="font-semibold">Mail:</p>
       <p className="ml-2">{travel.user.mail}</p>
       </div>
       <div className="flex">
          <p className="font-semibold">prix:</p>
          <p className="ml-2">{travel.price} credits</p>
        </div>
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
    
        <div className="flex">
          <p className="flex items-center font-semibold">Date de depart</p>
          <p className="ml-2">{dateWithoutDetailDay(travel.dateStarting)}</p>
        </div>
        <div className="flex">
          <p className="flex items-center font-semibold">Ville de depart:</p>
          <p className="ml-2"> {travel.itinerary.cityStart}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Ville d'arrivé:</p>
          <p className="ml-2">{travel.itinerary.cityEnd}</p>
        </div>
       <div className="flex">
       <p className="font-semibold">heure de depart:</p>
       <p className="ml-2">{HourFormat(travel.hour)}</p>
       </div>
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
        <div className="flex">
          <p className="flex items-center font-semibold">durée</p>
          <p className="ml-2">{duration}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">KM</p>
          <p className="ml-2">{travel.itinerary.km}</p>
        </div>
       <div className="flex">
       <p className="font-semibold">heure d'arrivé:</p>
       <p className="ml-2">{HourFormat(travel.itinerary.arrivedTime)}</p>
       </div>
       <div className="flex">
          <p className="flex items-center font-semibold ">Nom de la voiture:</p>
          <p className="ml-2"> {travel.car.brand}</p>
        </div>
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
        <div className="flex">
          <p className="flex items-center font-semibold">Adresse de depart:</p>
          <p className="ml-2">{travel.itinerary.streetStart} {travel.itinerary.zipStart}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Adresse d'arrivé:</p>
          <p className="ml-2">{travel.itinerary.streetEnd} {travel.itinerary.zipEnd}</p>
        </div>
        <div className="flex">
          <p className="flex items-center font-semibold">Petit Bagage:</p>
          <p className="ml-2">{travel.smallBaggageNbr}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Gros bagage:</p>
          <p className="ml-2">{travel.bigBaggageNbr}</p>
        </div>
      </div>

      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
        <div className="flex">
          <p className="font-semibold">Place au départ :</p>
          <p className="ml-2">{placeStart}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">{numberBooking > 1 ? "Places réservés : " : "Place réservé : "}</p>
          <p className="ml-2">{numberBooking}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">{travel.placeAvailable > 1 ? "Places restantes : " : "Place restante : "}</p>
          <p className="ml-2">{travel.placeAvailable}</p>
        </div>

      </div>
    </div>
  );
};

export default CardAdminTravel;
