import React from 'react'
import { useNavigate } from 'react-router-dom'
import { URL_TRAVEL_MANAGEMENT } from '../constants/urls/urlFrontEnd';

const NotifTravelInfo = ({ status, quitBulle, multiple }) => {

    const navigate = useNavigate();

  return (
    <div className="flex justify-center">
    <div className="absolute  bg-primary hover:shadow-lg sm:top-2 xs:top-1 rounded-xl flex justify-between items-center font-bold px-4 py-1
    xl:text-base xl:w-[35%] xl:h-8
    sm:text-xs sm:w-[50%] sm:h-6
    xs:text-xs xs:w-[90%] xs:h-4">
      {status === "WAITING" && (
        <>
          <p
            className="cursor-pointer hover:underline"
            onClick={() =>
              navigate(URL_TRAVEL_MANAGEMENT, {
                state: { waiting: true },
              })
            }
          >
            Vous avez déjà une réservation en attente pour se trajet
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:scale-110 cursor-pointer"
            onClick={quitBulle}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </>
      )}
      {status === "ACCEPTED" && (
        <>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate(URL_TRAVEL_MANAGEMENT)}
          >
            {multiple ? "Vous avez déjà plusieurs réservations pour se trajet" :
            "Vous avez déjà une réservation pour se trajet"}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:scale-110 cursor-pointer"
            onClick={quitBulle}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </>
      )}
    </div>
  </div>
  )
}

export default NotifTravelInfo
