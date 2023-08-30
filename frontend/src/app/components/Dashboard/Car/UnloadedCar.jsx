import React from "react";
import voiture3 from "../../../assets/pictures/profile/voiture3.svg";
import CardDetailsChange from "./CarDetailsChange";
import ImportFileButton from "./ImportFileButton";

const UnloadedCar = () => {
  return (
    <div className="absolute top-[60px]">
      <CardDetailsChange img={voiture3} />
      <div className="absolute top-[400px] left-[230px]">
        <ImportFileButton></ImportFileButton>
      </div>
    </div>
  );
};

export default UnloadedCar;
