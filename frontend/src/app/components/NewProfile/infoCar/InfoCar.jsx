import React from 'react'
import SliderCar from '../../itinerary/itineraryDetail/SliderCar'
import demivoiture from "../../../assets/pictures/profile/demivoiture.png";

const InfoCar = ({ car, color }) => {

  return (
<div className="CardDetails">
      <h4 className="ml-20 mt-10 font-bold">Détails du <span className='bg-primary p-1'>véhicule</span></h4>
      {/*Photos du véhicule*/}
      <div className="grid grid-cols-2 gap-20 ml-20">
          <div>
          <SliderCar />
        </div>
        {/*caractéristiques du véhicule*/}
          <div className="flex mt-[20%]">
          <img
          src={demivoiture}
          className="opacity-30 ml-48 -mt-[150px] h-[580px] w-[522px]"
        />
            <div className='absolute'>
              <h4 className="font-bold">{`${car?.brand}`.toUpperCase()}</h4>
              {/* DOORS */}
              <h5 className="my-5 flex ">
                <span className="text-black">
                  {!car?.door ? (
                    <span className="font-bold">3 </span>
                  ) : (
                    <span className="font-bold">5 </span>
                  )}
                  portes
                </span>
              </h5>
              <h5>
                <span className="text-black">
                  Véhicule
                  {!car?.airConditioner ? (
                    <span className="font-bold"> non climatisé</span>
                  ) : (
                    <span className="font-bold"> climatisé</span>
                  )}
                </span>
              </h5>
              <h5 className="my-5">
                Le véhicule est de couleur{" "}
                <span className="font-bold">{color}</span>
              </h5>
              <h5>
                Le véhicule{" "}
                {!car?.chest ? (
                  <span className="font-bold">ne comporte pas de coffre pour bagage</span>
                ) : (
                  <span className="font-bold">comporte un coffre pour bagage</span>
                )}

              </h5>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InfoCar
