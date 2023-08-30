import React, { useEffect, useState } from "react";
import endLocation from "../../../assets/pictures/Detail/location.svg";
import { HourFormat } from "../../../helpers/HourCustom";
import Wallet from './Wallet';

const DetailTravel = ({
  walletView,
  placeView,
  timeTravel,
  place,
  hour,
  timeArrive,
  streetStart,
  zipStart,
  cityStart,
  price,
  streetEnd,
  zipEnd,
  cityEnd,
  km,
}) => {
  const [viewWallet, setViewWallet] = useState();
  const [viewPlace, setViewPlace] = useState();



  useEffect(() => {
    setViewWallet(walletView);
    setViewPlace(placeView)
  }, []);

  return (
    <div className="flex xl:ml-20 xs:px-2 sm:px-0">
      <div className="flex-col xl:ml-16 mr-6">
        <div className="text-lg font-bold mb-9">{HourFormat(hour)}</div>
        <div className="mb-10">
          <p> {timeTravel}</p>
        {placeView ? (
                    <div className="flex items-center gap-1">
                    <p>{place}</p>
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
        ) : (
          <div></div>
        )}
        </div>
        <div className="mt-14 font-bold text-lg">{typeof timeArrive === "string" ? HourFormat(timeArrive) : ""}</div>
        
      </div>
      <div className="flex-col mr-6">
        <div className="w-3 h-3 bg-black ml-3 rounded-full"></div>
        <div className="h-40 bg-black w-1 ml-4"></div>
        <div className="w-3 h-3  mt-2 ml-3">
          <img src={endLocation} />
        </div>
      </div>
      <div className="flex-col ml-5">
        <div className="mb-16 font-bold">
          {streetStart}, {zipStart} {cityStart}
        </div>
        {/* WALLET */}
        {viewWallet ? (
          <div className="flex ">
            <Wallet />
            <div>
              <p className="mb-16 font-bold ml-4">{price} crédits</p>
            </div>
          </div>
        ) : (
          <div className="flex ">
            <div className="mb-10 w-10 h-10"></div>
            <div></div>
          </div>
        )}
        {/* ITINERARY END */}
        <div className="mb-10 font-bold">
          {streetEnd}, {zipEnd} {cityEnd}
        </div>
      </div>
    </div>
  );
};

export default DetailTravel;
