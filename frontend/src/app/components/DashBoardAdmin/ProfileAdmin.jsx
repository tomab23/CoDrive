import React from 'react'
import avatar from "../../assets/pictures/avatar.jpg";
import { DateDetail } from "../../helpers/DateDetail";
import NoteOneStar from '../NoteOneStar';
import { dateWithoutDetailDay } from '../../helpers/DateWithoutDetailDay';
import CardStatsTransaction from '../cards/CardStatsTransaction';
import { Link, useNavigate } from 'react-router-dom';
import { URL_ADMIN_CAR_USER,URL_ADMIN_TRAVELUSER, URL_ADMIN_COMMENTARY_USER } from '../../constants/urls/urlFrontEnd';


const ProfileAdmin = ({user, className }) => {

  const navigate = useNavigate();

  const userTravel = () => {
    navigate(URL_ADMIN_TRAVELUSER, {
      state: {
        userID: user.id,
        note: user.note,
        user: user
      }
    })
  }

  const userCommentary = () => {
    navigate(URL_ADMIN_COMMENTARY_USER, {
      state: {
        userID: user.id,
        user: user
      }
    })
  }

  console.log(user.id);

  const car = user.car;

  console.log("car", car);

  const userCar = () => {
    navigate(URL_ADMIN_CAR_USER, {
      state: {
        infos: user
      }
    })
  }
  return (
    <div className="my-5">
       <div className={`${className} flex justify-between 
       xl:flex-row xl:ml-20
       sm:flex-wrap 
       xs:flex-col xs:ml-2
       `}>
      <div className="flex 
      sm:ml-5">
        <div className='flex flex-col items-center gap-2'>
        {/* AVATAR */}
        <img
          src={avatar}
          alt="avatar"
          className="h-32 rounded-[10px] row-span-3 cursor-pointer"
          onClick={() => navigate(`/profile/${user.id}`)}
        />
        <NoteOneStar note={user.note} />
        </div>
        {/* USER INFORMATIONS */}
        <div className="flex flex-col gap-2 sm:ml-10 xs:ml-2">
          {/* NAME */}
          <div className="flex">
            <h5 className="mt-3 font-bold">
              {user.firstname} {user.lastname}
            </h5>
          </div>
          {/* MEMBER SINCE */}
          <h6 className="col-start-2 col-span-3">
           {user.mail}
          </h6>
          {/* Membre / credit / trajet effectué*/}
          <h6>Anniversaire : {dateWithoutDetailDay(user.dateOfBirth)}</h6>
        </div>
      </div>
      <div>
        <div className='xs:ml-2 sm:ml-0'>
          <p>
            Membre depuis le  {dateWithoutDetailDay(user.creationDate)}
          </p>
        </div>
        <div className='flex mt-5 xs:ml-2 sm:ml-0'>
      <div className=''>
            <CardStatsTransaction
        title="crédits"
        number={user.points}
      />
      </div>
        <div className='mx-4'>
        <CardStatsTransaction
        title="Trajets effectués"
        number={user.countTravel}
      />
        </div>
        </div>
      </div>
         {/* Bio */}
      <div className='xl:mt-0 xs:mt-5'>
        {/* <div className='pr-10 max-w-lg'> */}
        <div className='px-10 sm:w-[550px] xs:w-[400px] sm:mt-0'>
          {user.bio}
        </div>
        <div className='mt-10 pr-20  flex gap-2 text-blue-700 italic font-bold 
        xl:flex-col  xl:text-right
        sm:flex-row
        xs:flex-col xs:text-center'>
        <p className='hover:underline cursor-pointer xs:mx-5 xl:mx-0' onClick={userTravel} >Voir les trajets</p>
        <p className='hover:underline cursor-pointer xs:mx-5 xl:mx-0' onClick={userCommentary} >Voir les commentaires</p>
        {user.driver &&
        <p className='hover:underline cursor-pointer xs:mx-5 xl:mx-0' onClick={userCar} >Voir les voitures</p>
        }
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProfileAdmin
