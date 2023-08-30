import React, { useEffect, useState } from "react";
import { getListPassengers } from "../../../api/backend/account";
import CardPassengerInfo from "../../cards/CardPassengerInfo";

const TravelPassengers = ({infoId}) => {

    const [passengers, setPassengers] = useState([])

    useEffect(() => {
        getListPassengers(infoId)
        .then((res) => {
            setPassengers(res.data)
            console.log("data", res);
        })
        .catch((e) => {
            console.log("ERROR ", e.code);
        })
    }, [infoId])

    console.log("INFOiD", infoId);

    console.log("PASSENGERS", passengers);


  return (
    <div>
      <h5 className="sm:ml-20 xs:ml-6 my-10">
        <div className="border border-black sm:mr-20 xs:mr-6"></div>
        <div className="my-10">
            <h5>Passagers effectuant le trajet : ({passengers.length})</h5>
            {passengers.map((passenger) => (
                <CardPassengerInfo key={passenger.id} passenger={passenger} />
            ))}
        {/* <p>Nombre de passager attendu : </p> */}
        </div>
        <div className="border border-black sm:mr-20 xs:mr-6"></div>
      </h5>
    </div>
  );
};

export default TravelPassengers;
