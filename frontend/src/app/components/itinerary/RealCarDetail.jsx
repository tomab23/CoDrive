import React from 'react';

const RealCarDetail = ({ car }) => {
  if (!car) {
    return null;
  }
  return (
    <div className="CardDetails max-w-[600px]">
      {/* Caractéristiques du véhicule */}
      <div className="flex ml- mt-[10%]">
        <div>
          <h6 className="font-bold">{`${car.brand}`.toUpperCase()}</h6>
          {/* DOORS */}
          <h6 className="my-5 flex ">
            <span className="text-black">
              {!car.door ? (
                <span className="font-bold">3 </span>
              ) : (
                <span className="font-bold">5 </span>
              )}
              portes
            </span>
          </h6>
          <h6>
            <span className="text-black">
              Véhicule
              {!car.airConditioner ? (
                <span className="font-bold"> non climatisé</span>
              ) : (
                <span className="font-bold"> climatisé</span>
              )}
            </span>
          </h6>
          <h6 className="my-5">
            Le véhicule est de couleur{" "}
            <span className="font-bold">{car.carColor ?? car.color?.color}</span>
          </h6>
          <h6>
            Le véhicule{" "}
            {!car.chest ? (
              <span className="font-bold">ne comporte pas de coffre pour bagage</span>
            ) : (
              <span className="font-bold">comporte un coffre pour bagage</span>
            )}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default RealCarDetail;
