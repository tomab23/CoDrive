import React from "react";
import TrueSliderCar from "../../itinerary/itineraryDetail/TrueSliderCar";

const TrueCardDetailsOverall = ({ component, car }) => {
  return (
    <div className="CardDetailsOverall">
      {/* Photos du véhicule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 xl:mt-10 xl:ml-20 xs:px-2">
        <div className="max-w-[600px] -mt-10">
          <TrueSliderCar carId={car} />
        </div>
        {/* Caractéristiques du véhicule */}
        <div className="xs:-mt-20 sm:-mt-0 xs:px-2 xs:mb-10 sm:mb-0">{component}</div>
      </div>
    </div>
  );
};

export default TrueCardDetailsOverall;
