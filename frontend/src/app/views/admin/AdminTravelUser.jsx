import React, { useEffect, useState } from "react";
import Navbar from "./../../components/layouts/Navbar";
import TitleAdmin from "./../../components/admin/TitleAdmin";
import CardAdminTravel from "../../components/cards/CardAdminTravel";
import ReturnButton from "../../components/ReturnButton";
import Button from "../../components/Custom/Button";
import { useLocation } from "react-router-dom";
import {
  getAllTravelStatusByUserId,
  getTravelByUserId,
} from "../../api/backend/account";
import CardAdminTravelBooking from "./../../components/cards/CardAdminTravelBooking";

const AdminTravelUser = () => {
  const location = useLocation();
  const { userID } = location.state || {};
  const [travel, setTravel] = useState([]);
  const [booking, setBooking] = useState([]);
  const [selectedMap, setSelectedMap] = useState(1);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedButton, setSelectedButton] = useState("future");

  const [status, setStatus] = useState("ACCEPTED");
  const [date, setDate] = useState("future");

  const travelPast = () => {
    setStatus("ACCEPTED");
    setDate("past");
    setSelectedButton("past");
  };

  const travelFuture = () => {
    setStatus("ACCEPTED");
    setDate("future");
    setSelectedButton("future");
  };

  const travelWaiting = () => {
    setStatus("WAITING");
    setDate("future");
    setSelectedButton("waiting");
  };

  const handleShowMap1 = () => {
    setSelectedMap(1);
    setShowButtons(false);
  };

  const handleShowMap2 = () => {
    setSelectedMap(2);
    setShowButtons(true);
  };

  useEffect(() => {
    getTravelByUserId(userID,date).then((res) => {
      setTravel(res.data);
    });
  }, []);

  useEffect(() => {
    getAllTravelStatusByUserId(userID, status, date).then((res) => {
      setBooking(res.data);
    });
  }, [userID, status, date]);

  return (
    <div>
      <div>
        <Navbar />
        <ReturnButton className={"ml-20 mt-5"} />
        <h4 className=" ml-20 font-bold mb-5">
          Trajet(s) de {location.state.user.lastname}{" "}
          {location.state.user.firstname}{" "}
        </h4>
      </div>
      <div className="ml-20">
        <Button
          type="submit"
          className={`mb-4 mt-2 ${
            selectedMap === 1 ? "bg-gray-500" : "bg-secondary"
          }`}
          label="Trajet Conducteur"
          onClick={handleShowMap1}
        />
        <Button
          type="submit"
          className={`ml-3 mb-4 mt-2 ${
            selectedMap === 2 ? "bg-gray-500" : "bg-secondary"
          }`}
          label="Trajet passagé"
          onClick={handleShowMap2}
        />
      </div>
      <div>
        {showButtons && (
          <div className=" ml-20">
            <Button
              type="button"
              className={selectedButton === "past" ? "underline" : undefined}
              label="Trajets passés"
              onClick={travelPast}
            />
            <Button
              type="button"
              className={selectedButton === "future" ? "underline" : undefined}
              label="Prochain trajets "
              onClick={travelFuture}
            />
            <Button
              type="button"
              className={selectedButton === "waiting" ? "underline" : undefined}
              label="Trajets en attendants"
              onClick={travelWaiting}
            />
          </div>
        )}
      </div>
      <div className="pt-10 px-5">
        {selectedMap === 1 ?
          <>
          {travel.length >= 1 ? 
                     travel.map((travel) => 
                     <CardAdminTravel key={travel.id} travel={travel} />
                     )
                    :
                    <p>Aucun trajet</p>
                    }
          </>
          : 
          <>
          {booking.length >= 1 ?
        booking.map((booking) => (
          <CardAdminTravelBooking key={booking.id} travel={booking} />
        ))
        :
        <p className="ml-20">Aucun trajet</p>  
        }
          </>
            
            }
      </div>
    </div>
  );
};

export default AdminTravelUser;
