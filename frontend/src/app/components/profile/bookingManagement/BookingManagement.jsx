import React, { useEffect, useState } from "react";
import { getReservarions } from "../../../api/backend/account";
import CardTravelManagement from "../../cards/CardTravelManagement";

const BookingManagement = ({ waiting}) => {
  // ACCEPTED, WAITING, REFUSED
  const [status, setSatus] = useState(waiting ? "WAITING" : "ACCEPTED");
  // null, past, future
  const [date, setDate] = useState("future");

  const [future, setFuture] = useState(waiting ? false : true);
  const [past, setPast] = useState(false);
  const [wait, setWait] = useState(waiting ? true : false);

  const [listBooking, setListBooking] = useState([]);
  const [counBooking, setCountBooking] = useState();

  useEffect(() => {
    getReservarions(status, date)
      .then((res) => {
        setListBooking(res.data);
        setCountBooking(res.data.length);
      })
      .catch((e) => {
        console.log(e.code);
      });
  }, [status, date]);

  console.log(listBooking, counBooking);
  console.log("status", status, "date", date);

  const travelPast = () => {
    setFuture(false);
    setWait(false);
    setPast(true);
    setSatus("ACCEPTED");
    setDate("past");
  };

  const travelFuture = () => {
    setPast(false);
    setWait(false);
    setFuture(true);
    setSatus("ACCEPTED");
    setDate("future");
  };

  const travelWait = () => {
    setPast(false);
    setFuture(false);
    setWait(true);
    setSatus("WAITING");
    setDate("future");
  };

  console.log(listBooking);

  return (
    <div>
      <h5>
        <span className="bg-primary p-1 font-bold">Vos réservations</span>
      </h5>

      {/* FILTER BUTTONS */}
      <div className="my-5 flex sm:flex-row xs:flex-wrap sm:gap-10 xs:gap-5">
        <button
          className={past ? "font-bold disabled cursor-default" : ""}
          onClick={travelPast}
        >
          Trajet passé
        </button>

        <button
          className={future ? "font-bold disabled cursor-default" : ""}
          onClick={travelFuture}
        >
          Trajet a venir
        </button>

        <button
          className={wait ? "font-bold disabled cursor-default" : ""}
          onClick={travelWait}
        >
          Reservation en attente
        </button>

        {past && (
          <>
            {counBooking > 1 ? (
              <p className="xl:ml-20 font-semibold">
                {counBooking} trajets passés
              </p>
            ) : (
              <p className="xl:ml-20 font-semibold">{counBooking} trajet passé</p>
            )}
          </>
        )}
        {future && (
          <>
            {counBooking > 1 ? (
              <p className="xl:ml-20  font-semibold">
                {counBooking} trajets a venir
              </p>
            ) : (
              <p className="xl:ml-20  font-semibold">
                {counBooking} trajet a venir
              </p>
            )}
          </>
        )}
        {wait && (
          <p className="xl:ml-20 font-semibold">{counBooking} en attente</p>
        )}
      </div>

      <div className={wait ? "flex flex-col gap-5 items-start xs:-ml-6 sm:-ml-0" : "flex flex-col gap-5 items-start xs:-ml-2 sm:-ml-0"}>
        {listBooking
          .map((booking) => (
            <CardTravelManagement key={booking.id} booking={booking} />
          ))
          .reverse()}
        {listBooking < 1 && (
          <h6 className="mt-5 font-semibold">Aucune réservation </h6>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
