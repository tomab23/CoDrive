import React, { useState, useEffect } from "react";
import TrueCardDetailsOverall from "../../Dashboard/Car/TrueCardDetailOverall";
import RealCarDetail from "../RealCarDetail";

const GetCarInformations = ({ car }) => {
  const carId = car.carId;
  const [carColor, setCarColor] = useState("");
  
  useEffect(() => {
    setCarColor(car.carColor);
  }, [car.carColor]);
  
  
  const cars = {
    brand: car.carName,
    door: car.Door,
    isAirConditioner: car.isAirConditioner,
    chest: car.Chest,
    carColor: carColor,
  };
  
  return (
    <div className="mt-10 xs:mx-auto sm:mr-0">
      <TrueCardDetailsOverall car={carId} component={<RealCarDetail car={cars} />} />
    </div>
  );
};

export default GetCarInformations;
