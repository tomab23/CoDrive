import React, { useState, useEffect } from "react";
import avatar from "../../assets/pictures/avatar.jpg";
import { HourFormat } from "../../helpers/HourCustom";
import { dateWithoutDetailDay } from "../../helpers/DateWithoutDetailDay";
import { useNavigate } from "react-router-dom";
import { durationCalcule } from "../../helpers/durationCalcule";
import { getImageProfileById } from "../../api/backend/account";
const CardTravelProfile = ({ user, index, driver }) => {
  const navigate = useNavigate();

  const [dateStarting, setDateStarting] = useState();

  const nowDate = new Date();

  const today =
    nowDate.getFullYear() +
    "-" +
    ("0" + (nowDate.getMonth() + 1)).slice(-2) +
    "-" +
    nowDate.getDate();

  const tomorrow =
    nowDate.getFullYear() +
    "-" +
    ("0" + (nowDate.getMonth() + 1)).slice(-2) +
    "-" +
    (nowDate.getDate() + 1);

  // const endTime = carrousel.itinerary.arrivedTime
  // const startTime = carrousel.hour;
  // const duration = durationCalcule(startTime, endTime);

  // {GESTION DES IMAGES}
  const [profile, setProfile] = useState();

  //RECUPERE IMAGE PROFILE
  useEffect(() => {
    if (driver) {
      getImageProfileById(user.id)
        .then((res) => {
          setProfile(res.data.image);
        })
        .catch((error) => {
          console.error("Error fetching profile image:", error);
        });
    } else {
      getImageProfileById( user?.listNextTwoBookings[Number(index)].user.id)
        .then((res) => {
          setProfile(res.data.image);
        })
        .catch((error) => {
          console.error("Error fetching profile image:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (driver) {
      if (user?.listNextTwoTravels[Number(index)].dateStarting == today) {
        setDateStarting("Aujourd'hui");
      } else if (
        user?.listNextTwoTravels[Number(index)].dateStarting == tomorrow
      ) {
        setDateStarting("Demain");
      } else {
        setDateStarting(
          dateWithoutDetailDay(
            user?.listNextTwoTravels[Number(index)].dateStarting
          )
        );
      }
    } else {
      if (user?.listNextTwoBookings[Number(index)].dateStarting == today) {
        setDateStarting("Aujourd'hui");
      } else if (
        user?.listNextTwoBookings[Number(index)].dateStarting == tomorrow
      ) {
        setDateStarting("Demain");
      } else {
        setDateStarting(
          dateWithoutDetailDay(
            user?.listNextTwoBookings[Number(index)].dateStarting
          )
        );
      }
    }
  }, []);

  const HandleInfoTravel = () => {
    {
      driver
        ? navigate(
            `/itinerary-detail/${user?.listNextTwoTravels[Number(index)].id}`
          )
        : navigate(
            `/itinerary-detail/${user.listNextTwoBookings[Number(index)].id}`
          );
    }
  };

  const endTime = driver
    ? user.listNextTwoTravels[Number(index)].itinerary.arrivedTime
    : user.listNextTwoBookings[Number(index)].itinerary.arrivedTime;

  const startTime = driver
    ? user.listNextTwoTravels[Number(index)].hour
    : user.listNextTwoBookings[Number(index)].hour;
  const duration = durationCalcule(startTime, endTime);

  return (
    <div
      className="flex bg-[#F5F8F5] h-[130px] sm:w-[650px] xs:w-[380px] rounded-[10px] border-[1px]
        hover:bg-[#FFF9D8] border-gray-400 cursor-pointer p-2 "
      onClick={HandleInfoTravel}
    >
      {/* PROFILE */}
      <div className="w-28 flex flex-col items-center justify-center gap-1 font-bold mt-2">
        {/* AVATAR */}
        <div className="avatar">
          <div className="w-14 h-14 rounded-xl ">
            <img src={profile ? profile : avatar} />
          </div>
        </div>
        {/* DATE START*/}
        <div className="flex items-center gap-1 font-bold mt-4">
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
          <p className="text-xs">{dateStarting}</p>
        </div>
      </div>

      {/* ITINARY */}
      <div className=" flex-1 flex justify-center items-center">
        {/* CITY START */}
        <div className="flex flex-col items-center mr-2">
          {driver ? (
            <p className="font-bold text-xl">
              {user.listNextTwoTravels[Number(index)].itinerary.cityStart}
            </p>
          ) : (
            <p className="font-bold text-xl">
              {user.listNextTwoBookings[Number(index)].itinerary.cityStart}
            </p>
          )}
          {driver ? (
            <p className="font-regular">
              {HourFormat(user.listNextTwoTravels[Number(index)].hour)}
            </p>
          ) : (
            <p className="font-regular">
              {HourFormat(user.listNextTwoBookings[Number(index)].hour)}
            </p>
          )}
        </div>
        {/* VISUALISATION AND HOUR */}
        <div className="flex mb-5">
          {window.innerWidth > 500 &&
          <div className="h-3 w-3 rounded-xl bg-black"></div>
          }
          <div className="container h-0.5 sm:w-48 xs:w-10 my-auto border border-black bg-black">
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
          {driver ? (
            <p className="font-bold text-xl">
              {user.listNextTwoTravels[Number(index)].itinerary.cityEnd}
            </p>
          ) : (
            <p className="font-bold text-xl">
              {user.listNextTwoBookings[Number(index)].itinerary.cityEnd}
            </p>
          )}
          {driver ? (
            <p className="font-regular">
              {HourFormat(
                user.listNextTwoTravels[Number(index)].itinerary.arrivedTime
              )}
            </p>
          ) : (
            <p className="font-regular">
              {HourFormat(
                user.listNextTwoBookings[Number(index)].itinerary.arrivedTime
              )}
            </p>
          )}
        </div>
      </div>

      {/* CREDITS / AVAILABLE SEAT */}
      <div className="w-28 flex flex-col items-center justify-center gap-2 font-bold mt-1">
        {/* CREDITS */}
        <div className="flex flex-col items-center">
          {driver ? (
            <p>{user?.listNextTwoTravels[Number(index)].price}</p>
          ) : (
            <p>{user.listNextTwoBookings[Number(index)].price}</p>
          )}
          <p className="-mt-1">crédits</p>
        </div>
        {/* AVAILABLE SEAT */}
        <div className="flex items-center gap-1 text-dark">
          {driver ? (
            <p>{user?.listNextTwoTravels[Number(index)].placeAvailable}</p>
          ) : (
            <p>{user.listNextTwoBookings[Number(index)].placeAvailable}</p>
          )}
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
};

export default CardTravelProfile;