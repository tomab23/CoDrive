import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import ReturnButton from "../../components/ReturnButton";
import CardStatsTransaction from "../../components/cards/CardStatsTransaction";
import BookingManagement from "../../components/profile/bookingManagement/BookingManagement";
import ProgramTravelManagement from "../../components/profile/bookingManagement/ProgramTravelManagement";
import HistoriqueManagement from "../../components/profile/bookingManagement/HistoriqueManagement";
import Footer from "../../components/layouts/Footer";
import StatsBooking from "../../components/profile/bookingManagement/StatsBooking";
import { useLocation } from "react-router-dom";

const TravelManagement = () => {

  const location = useLocation();
  const [reserve, setReserve] = useState(true);
  const [program, setProgram] = useState(false);
  const [historique, setHistorique] = useState(false);

  const openProgram = () => {
    setReserve(false);
    setHistorique(false);
    setProgram(true);
  };

  const openReserve = () => {
    setHistorique(false);
    setProgram(false);
    setReserve(true);
  };

  const openHistorique = () => {
    setReserve(false);
    setProgram(false);
    setHistorique(true);
  };

  return (
    <div>
      <Navbar />

      <div className="mt-5">
      {window.innerWidth > 500 &&
        <ReturnButton className={"xl:ml-20 sm:ml-10"} />
      }
      </div>
      <h4 className=" mb-5 xl:ml-20 sm:ml-10 xs:ml-6 font-bold">Mes trajets</h4>

      <StatsBooking />

      <div className="xl:ml-20 sm:ml-10 xs:ml-6 mt-10 pb-10 ">
        {/* BUTTONS FILTER */}
        <div className="flex sm:flex-row xs:flex-col sm:gap-10 xs:gap-4 font-bold sm:mb-5 xs:mb-10">
          <button
            className={historique ? "underline" : "hover:underline"}
            onClick={openHistorique}
          >
            <h5>Historique</h5>
          </button>
          <button
            className={program ? "underline" : "hover:underline"}
            onClick={openProgram}
          >
            <h5>Trajets programmés</h5>
          </button>
          <button
            className={reserve ? "underline" : "hover:underline"}
            onClick={openReserve}
          >
            <h5>Réservation</h5>
          </button>
        </div>

        {/* LIST */}
        {/* TODO: mettre ça en route imbriqué ? */}
        {reserve && <BookingManagement waiting={location.state?.waiting} />}
        {program && <ProgramTravelManagement />}
        {historique && <HistoriqueManagement />}
      </div>

      <div className="-mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default TravelManagement;
