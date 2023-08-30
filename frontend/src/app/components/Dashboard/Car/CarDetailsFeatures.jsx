import React, { useEffect, useState } from "react";
import SliderCar from "../../itinerary/itineraryDetail/SliderCar";

const CarDetailsFeatures = ({ img, car }) => {
  return (
    <div className="CardDetailsFeatures">
      <div className="grid grid-cols-2 gap-2 ml-20">
        {/*le carousel avec les photos voiture*/}
        <div className="w-[600px] -mt-10 ">
          <SliderCar />
        </div>

        {/*caractéristiques du véhicule*/}
        <img
          src={img}
          className="opacity-30 ml-48 -mt-[150px] h-[580px] w-[522px]"
        />
        <div className="absolute inset-y-16 ml-10 w-[650px] left-[815px]">
          {/*marque du véhicule*/}
          <h4 className="font-bold">{car?.brand}</h4>
          <h5 className="my-5">
            {/*portes du véhicule*/}
            {!car?.door ? (
              <span className="font-bold">3 </span>
            ) : (
              <span className="font-bold">5 </span>
            )}
            portes
          </h5>
          {/*climatisation du véhicule*/}
          <h5>
            Véhicule
            {!car?.airConditioner ? (
              <span className="font-bold"> non climatisé</span>
            ) : (
              <span className="font-bold"> climatisé</span>
            )}
          </h5>
          {/*couleur du véhicule*/}
          <h5 className="my-5">
            Le véhicule est de couleur{" "}
            <span className="font-bold">{car?.color.color}</span>
          </h5>
          <h5>
            {/*coffre du véhicule*/}
            Le véhicule
            {!car?.chest ? (
              <span className="font-bold"> ne comporte pas de coffre</span>
            ) : (
              <span className="font-bold"> comport un coffre</span>
            )}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsFeatures;
