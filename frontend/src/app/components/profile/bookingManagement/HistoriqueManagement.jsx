import React, { useEffect, useState } from "react";
import {
  getReservarions,
  getTravelsOfUser,
} from "../../../api/backend/account";
import CardTravelManagement from "../../cards/CardTravelManagement";

const HistoriqueManagement = () => {


  const [program, setProgram] = useState(false);
  const [book, setBook] = useState(false);

  const [travels, setTravels] = useState([]);
  const [counTravels, setCountTravels] = useState();

  const [listBooking, setListBooking] = useState([]);
  const [counBooking, setCountBooking] = useState();

  useEffect(() => {
    getTravelsOfUser("past").then((res) => {
      // console.log(res);
      setTravels(res.data);
      setCountTravels(res.data.length);
    });
  }, []);

  useEffect(() => {
    getReservarions("ACCEPTED", "past").then((res) => {
      setListBooking(res.data);
      setCountBooking(res.data.length);
    });
  }, []);

  const openBooking = () => {
    setProgram(false);
    setBook(true);
  };

  const openProgram = () => {
    setBook(false);
    setProgram(true);
  };

  console.log(listBooking);

  return (
    <div>
      <h5>
        <span className="bg-primary p-1 font-bold">Votre Historique</span>
      </h5>

      <div className="my-5 flex sm:gap-10 xs:gap-2 sm:flex-row xs:flex-wrap">
        <button 
        className={program ? "font-bold disabled cursor-default" : ""}
         onClick={openProgram}>Vos anciens trajets programmés</button>

        <button
        className={book ? "font-bold disabled cursor-default" : ""}
        onClick={openBooking}>Vos anciennes réservations</button>

        {book && 
        <>
                  {counBooking > 1 ? (
              <p className="ml-20 font-semibold">{counBooking} trajets passés</p>
            ) : (
              <p className="ml-20 font-semibold">{counBooking} trajet passé</p>
            )}
        </>
        }

{program && 
       <>
                   {counTravels > 1 ? (
              <p className="ml-20 font-semibold">{counTravels} trajets passés</p>
            ) : (
              <p className="ml-20 font-semibold">{counTravels} trajet passé</p>
            )}
       </>
        }
      </div>

      {book && (
        <div className=" flex flex-col gap-5 items-start xs:-ml-2 sm:-ml-0">
          {listBooking.map((booking) => (
            <CardTravelManagement key={booking.id} booking={booking} program={false} />
          )).reverse()}
                                {listBooking < 1 &&
          <h6 className="mt-5 font-semibold">Aucune ancienne réservation</h6>
          }
        </div>
      )}

      {program && (
        <div className=" flex flex-col gap-5 items-start xs:-ml-2 sm:-ml-0">
          {travels.map((travel) => (
            <CardTravelManagement
              key={travel.id}
              travel={travel}
              program={true}
            />
          )).reverse()}
                                {travels < 1 &&
          <h6 className="mt-5 font-semibold">Aucun ancien trajet programmé</h6>
          }
        </div>
      )}

      {/* <p className="mt-20">
        Ou afficher 2 list directement {" => "} Vos anciens trajets programmés -
        Vos anciennes réservations{" "}
      </p>
      <div className="flex gap-20">
        <div className=" flex flex-col gap-5 w-80">
          {travels.map((travel) => (
            <CardTravelManagement
              key={travel.id}
              travel={travel}
              program={true}
            />
          ))}
        </div>
        <div className=" flex flex-col gap-5 w-80">
          {listBooking
            .map((booking) => (
              <CardTravelManagement key={booking.id} booking={booking} />
            ))
            .reverse()}
        </div>
      </div> */}
    </div>
  );
};

export default HistoriqueManagement;
