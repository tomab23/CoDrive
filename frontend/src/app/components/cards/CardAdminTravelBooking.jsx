import React from "react";
import avatar from "../../assets/pictures/avatar.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import NoteOneStar from './../NoteOneStar';
import { durationCalcule } from '../../helpers/durationCalcule';
import { dateWithoutDetailDay } from "../../helpers/DateWithoutDetailDay";
import { HourFormat } from "../../helpers/HourCustom";
import { getImageProfileById } from "../../api/backend/account";

const CardAdminTravelBooking = ({travel}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const endTime = travel.booking.info.itinerary.arrivedTime; 
  const startTime = travel.booking.info.hour;
  const duration = durationCalcule(startTime, endTime);

  console.log("booking", travel);

  const detailsInfo = () => {
    navigate(`/itinerary-detail/${travel.booking.info.id}`);
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
          <p className="ml-2">{travel.booking.info.price} credits</p>
        </div>  
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
      <div className="flex">
          <p className="flex items-center font-semibold">Date de depart</p>
          <p className="ml-2">{dateWithoutDetailDay(travel.booking.info.dateStarting)}</p>
        </div>
        <div className="flex">
          <p className="flex items-center font-semibold">Ville de depart:</p>
          <p className="ml-2">{travel.booking.info.itinerary.cityStart}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Ville d'arrivé:</p>
          <p className="ml-2">{travel.booking.info.itinerary.cityEnd}</p>
        </div>
       <div className="flex">
       <p className="font-semibold">heure de depart:</p>
       <p className="ml-2">{HourFormat(travel.booking.info.hour)}</p>
       </div>
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
        <div className="flex">
          <p className="flex items-center font-semibold">durée</p>
          <p className="ml-2">{duration}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">KM</p>
          <p className="ml-2">{travel.booking.info.itinerary.km}</p>
        </div>
       <div className="flex">
       <p className="font-semibold">heure d'arrivé:</p>
       <p className="ml-2">{HourFormat(travel.booking.info.itinerary.arrivedTime)}</p>
       </div>
       <div className="flex">
          <p className="flex items-center font-semibold ">Nom de la voiture:</p>
          <p className="ml-2">{travel.booking.info.car.brand}</p>
        </div>
      </div>
      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
        <div className="flex">
          <p className="flex items-center font-semibold">Adresse de depart:</p>
          <p className="ml-2">{travel.booking.info.itinerary.streetStart} {travel.booking.info.itinerary.zipStart}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Adresse d'arrivé:</p>
          <p className="ml-2">{travel.booking.info.itinerary.streetEnd} {travel.booking.info.itinerary.streetEnzipEnd}</p>
        </div>
        <div className="flex">
          <p className="flex items-center font-semibold">Petit Bagage:</p>
          <p className="ml-2">{travel.booking.info.smallBaggageNbr}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Gros bagage:</p>
          <p className="ml-2">{travel.booking.info.bigBaggageNbr}</p>
        </div>
      </div>

      <div className="flex flex-col  mr-2 items-start justify-center gap-1 mt-2 ml-5">
        <div className="flex">
          <p className="font-semibold">{travel.booking.place > 1 ? "Places prises : " : "Place prise : "}</p>
          <p className="ml-2">{travel.booking.place}</p>
        </div>
        <div className="flex">
          <p className="font-semibold">Dépense :</p>
          <p className="ml-2">{travel.booking.credits}</p>
        </div>
      </div>
    </div>
  );
};

export default CardAdminTravelBooking;
