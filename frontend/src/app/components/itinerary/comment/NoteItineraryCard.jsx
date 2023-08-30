import React, { useEffect, useState } from "react";
import avatar from "../../../assets/pictures/avatar.jpg";
import { useNavigate } from "react-router-dom";
import { HourFormat } from "../../../helpers/HourCustom";
import { dateWithoutDetailDay } from "../../../helpers/DateWithoutDetailDay";

const NoteItineraryCard = ({ travels }) => {
  return (
    // w-680px
    <div
      className="h-auto w-[625px] bg-[#F5F8F5] border border-gray-400 rounded-lg flex flex-col
          p-2"
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
        <p className="text-xs">{dateWithoutDetailDay(travels.dateStarting)}</p>
      </div>
      <div className="flex -mt-3">
        {/* PROFILE */}
        <div className="w-28 flex flex-col items-center justify-center gap-1 font-bold mt-2">
          {/* AVATAR */}
          <div className="avatar">
            <div className="w-14 h-14 rounded-xl ">
              <img src={avatar} />
            </div>
          </div>
          {/* NUMBER OF STARS */}
          <div className="flex items-center ml-1 gap-1">
            <p className="text-star">{travels.note}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-star"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
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
            {/* w-72 */}
            <div className="container h-0.5 w-40 my-auto border border-black bg-black">
              <p className="text-center font-bold mt-2"></p>
            </div>
            <div className="h-3 w-3 rounded-xl bg-black"></div>
          </div>
          {/* CITY END */}
          <div className="flex flex-col items-center ml-2">
            {/* mb-5 en attendant l'heure d'arrivée */}
            <p className="font-bold text-lg mb-5">
              {travels.itinerary.cityEnd}
            </p>
            <p className="font-semibold"> </p>
          </div>
        </div>

        {/* CREDITS / AVAILABLE SEAT */}
        <div className="w-28 flex flex-col items-center justify-center gap-2 font-bold mt-1">
          {/* CREDITS */}
          <div className="flex flex-col items-center">
            <p>{travels.price}</p>
            <p className="-mt-1">crédits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItineraryCard;
