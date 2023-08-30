import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import demivoiture from "../../../assets/pictures/profile/demivoiture.png";

const CardDetailsChange = ({ component, img }) => {
  const [doorSelected, setDoorSelected] = useState(false);
  const [airConditionerSelected, setAirConditionerSelected] = useState(false);
  const [carBootSelected, setCarBootSelected] = useState(false);

  return (
    <div className="CardDetailsChange">
      <div className="grid grid-cols-2 gap-2 ml-20">
        {/* soit le composant slider soit une image si pas de véhicule*/}
        <div className="w-[600px] -mt-10 ">
          {component}
          <img src={img} />
        </div>

        {/*caractéristiques du véhicule*/}
        {/*image de fond*/}
        <img
          src={demivoiture}
          className="opacity-30 ml-48 -mt-[150px] h-[580px] w-[522px]"
        />

        {/*champs à modifier*/}
        <div className="absolute inset-y-16 ml-10 w-[650px] left-[815px]">
          {/*nom*/}
          <h4 className="font-bold">Suzuki Swift Sport 2015</h4>
          <h5 className="my-5 flex cursor-pointer">
            {/*porte*/}
            <span
              className={doorSelected ? "text-black" : "text-dark opacity-70"}
              onClick={() => setDoorSelected(!doorSelected)}
            >
              <span className="font-bold">5 </span>
              portes
            </span>
            <span
              className={doorSelected ? "text-dark opacity-70" : "text-black"}
              onClick={() => setDoorSelected(!doorSelected)}
            >
              <span className="font-bold ml-6">3 </span>
              portes
            </span>
          </h5>
          {/*climatisation*/}
          <h5 className="flex cursor-pointer">
            <span
              className={
                airConditionerSelected ? "text-black" : "text-dark opacity-70"
              }
              onClick={() => setAirConditionerSelected(!airConditionerSelected)}
            >
              Véhicule
              <span className="font-bold"> climatisé</span>
            </span>
            <span
              className={
                "ml-6" +
                (airConditionerSelected
                  ? "text-dark opacity-70"
                  : "text-black") +
                " " +
                "ml-6"
              }
              onClick={() => setAirConditionerSelected(!airConditionerSelected)}
            >
              Véhicule
              <span className="font-bold"> non climatisé</span>
            </span>
          </h5>
          {/*couleur*/}
          <h5 className="my-5">
            Le véhicule est de couleur{" "}
            <div className="absolute top-[155px] left-[280px]">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center rounded-[10px] ml-4 px-4 py-2 text-[20px] font-bold bg-white">
                    Sélectionner votre couleur
                    <ChevronDownIcon
                      className="ml-2 mt-1.5 h-6 w-6"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items
                  className={
                    " bg-white absolute h-[120px] w-[300px] ml-6 pt-1 font-Montserrat font-bold text-[20px]"
                  }
                >
                  <div className="ml-4 grid grid-cols-1">
                    <Menu.Item>
                      {({ active }) => (
                        <span className={`${active && "bg-primary"}`}>
                          Rouge
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <span className={`${active && "bg-primary"}`}>
                          Vert
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <span className={`${active && "bg-primary"}`}>
                          Bleu
                        </span>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </h5>
          {/*coffre*/}
          <h5 className="flex cursor-pointer">
            <span
              className={
                carBootSelected ? "text-black" : "text-dark opacity-70"
              }
              onClick={() => setCarBootSelected(!carBootSelected)}
            >
              Le véhicule
              <span className="font-bold"> comporte un coffre</span>
            </span>
            <span
              className={
                "ml-6" +
                (carBootSelected ? "text-dark opacity-70" : "text-black") +
                " " +
                "ml-6"
              }
              onClick={() => setCarBootSelected(!carBootSelected)}
            >
              Le véhicule
              <span className="font-bold"> ne comporte pas de coffre</span>
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsChange;
