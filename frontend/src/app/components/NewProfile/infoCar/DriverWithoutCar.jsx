import React from "react";
import demivoiture from "../../../assets/pictures/profile/demivoiture.png";
import { useNavigate } from "react-router-dom";
import { URL_ADD_CAR_PROFILE } from "../../../constants/urls/urlFrontEnd";

const DriverWithoutCar = () => {
  const navigate = useNavigate();

  const creationCar = () => {
    navigate(URL_ADD_CAR_PROFILE)
  };

  return (
    <div className="h-[400px]">
      <h4 className="ml-20 mt-10 font-bold">
        Vous n'avez pas encore{" "}
        <span className="bg-primary p-1">ajouté un véhicule</span> ?
      </h4>

      <div className="flex justify-between items-center">
        <div className="p-20 outline-dashed outline-2 outline-primary rounded-xl ml-[40%]">
          <button
            onClick={creationCar}
            className="font-bold bg-secondary px-6 py-2 rounded-lg"
          >
            Ajouter votre véhicule
          </button>
        </div>
        <img
          src={demivoiture}
          className="opacity-30 -mt-[55px] h-[400px] w-[400px] "
        />
      </div>
    </div>
  );
};

export default DriverWithoutCar;
