import React, { useState, useEffect } from "react";
import Navbar from "../../components/layouts/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Custom/Button";
import {
  URL_CONFIRM_TRAVEL,
  URL_ERROR_404,
  URL_NOTE_TRAVEL,
  URL_SEARCH_LIST,
  URL_TRAVEL_MANAGEMENT,
} from "../../constants/urls/urlFrontEnd";
import { useSelector } from "react-redux";
import {
  selectHasRole,
  selectIsLogged,
  selectUser,
} from "../../redux-store/authenticationSlice";
import "leaflet/dist/leaflet.css";
import Footer from "../../components/layouts/Footer";
import axios from "axios";
import GetCarInformations from "../../components/itinerary/itineraryDetail/GetCarInformations";
import { DateDetail } from "./../../helpers/DateDetail";
import DetailTravel from "../../components/itinerary/itineraryDetail/DetailTravel";
import ItineraryProfile from "../../components/itinerary/itineraryDetail/ItineraryProfile";
import apiBackendInfo from "../../api/backend/api.BackendInfo";
import DetailsPreference from "../../components/itinerary/itineraryDetail/DetailsPreferences";
import Map from "./../../components/itinerary/search/Map";

import { setHourDate } from "../../helpers/setHourDate";
import ButtonBackPage from "../../components/Custom/ButtonBackPage";
import { durationCalcule } from "../../helpers/durationCalcule";
import { getTravelExist } from "../../api/backend/account";
import { URL_TRANSACTION_PROFILE } from "../../constants/urls/urlBackEnd";
import TravelPassengers from "../../components/itinerary/itineraryDetail/TravelPassengers";
import NotifTravelInfo from "../../components/NotifTravelInfo";

const getCoordinates = async (city) => {
  try {
    const formattedAddress = `${city}`;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        formattedAddress
      )}`
    );

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return [parseFloat(lat), parseFloat(lon)];
    } else {
      throw new Error("No coordinates found for the address");
    }
  } catch (error) {
    console.error("Error retrieving coordinates:", error);
  }
};

const ItineraryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const isLoggued = useSelector(selectIsLogged);
  const hasRole = useSelector((state) => selectHasRole(state));
  const hasUser = useSelector((state) => selectUser(state));

  // Contain travel's informations
  const [infoTravel, setInfoTravel] = useState([]);
  // Contain itinerary for the travel
  const [itinerary, setItinerary] = useState([]);
  // Informations for the map
  const [startCity, setStartCity] = useState();
  const [endCity, setEndCity] = useState();
  // Note of the user about this travel
  const [noteUseTravel, setNoteUserTravel] = useState(0);

  // Place available
  const [noPlace, setNoPlace] = useState(false);

  // Date now
  const time = new Date().getTime();
  // Date of travel
  const timeTravel = setHourDate(
    infoTravel.hour,
    infoTravel.dateStarting
  ).getTime();



  const [travelExist, setTravelExist] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bulle, setBulle] = useState(true);
  const quitBulle = () => {
    setBulle(false);
  };

  useEffect(() => {
    apiBackendInfo
      .get(`getInfoTravel/${Number(params.id)}`)
      .then((res) => {
        setInfoTravel(res.data);
        setStartCity(res.data.itinerary.cityStart);
        setEndCity(res.data.itinerary.cityEnd);
        setItinerary(res.data.itinerary);
        setNoteUserTravel(res.data.note);
        if (res.data.placeAvailable < 1) {
          setNoPlace(true);
        }
      })
      .catch((e) => {
        console.log(e);
        navigate(URL_ERROR_404);
      });
  }, []);

  useEffect(() => {
    getTravelExist(infoTravel.id).then((res) => {
      setTravelExist(res.data);
      setBookings(res.data[0].booking);
    });
  }, [infoTravel]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (startCity && endCity) {
        const startCoords = await getCoordinates(startCity);
        const endCoords = await getCoordinates(endCity);
        setStartCoordinates(startCoords);
        setEndCoordinates(endCoords);
      }
    };

    fetchCoordinates().catch((e) => console.log(e));
  }, [startCity, endCity]);

  // Navigation with travel's informations
  const confirmTravel = () => {
    if (timeTravel > time && !noPlace) {
      navigate(URL_CONFIRM_TRAVEL, {
        state: {
          travel: infoTravel,
          search: location.state,
          duration: duration,
        },
      });
    }
  };

  const goBack = () => {
    if (location.state === null) {
      history.go(-1);
    } else {
      navigate(URL_SEARCH_LIST, {
        state: location.state,
      });
    }
  };

  const endTime = String(itinerary.arrivedTime);
  const startTime = String(infoTravel.hour);
  const duration = durationCalcule(startTime, endTime);

  const [startAddress, setStartAddress] = useState("1 Rue Faidherbe");
  const [endAddress, setEndAddress] = useState("30 rue Jean de la Fontaine");
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [endCoordinates, setEndCoordinates] = useState(null);

  return (
    <div>
      {/* INFO BULLE */}
      {travelExist.length == 1 && bulle && timeTravel > time && (
        <NotifTravelInfo status={bookings.status} quitBulle={quitBulle} multiple={false} />
      )}
      {travelExist.length > 1 && bulle && timeTravel > time && (
        <NotifTravelInfo status={bookings.status} quitBulle={quitBulle} multiple={true} />
      )}
      {/* HEADER */}
      <Navbar />

      {/* RETURN BUTTON */}
        {window.innerWidth > 500 &&
              <div className="mt-5">
              <ButtonBackPage onClick={goBack} className={"xl:ml-20 sm:ml-10"} />
            </div>
        }

      {/* PROFILE DETAILS */}
      <div className="xl:ml-20 sm:ml-10 xs:ml-6 xs:mt-8 sm:mt-0 mb-5">
        <h4 className="font-bold xl:text-3xl sm:text-2xl xs:text-xl">
          Détails du trajet pour le{" "}
          <span className="bg-primary p-1">
            {DateDetail(infoTravel.dateStarting)}
          </span>
        </h4>
        <p>ref: {infoTravel.reference}</p>
      </div>

      {/* PROFILE */}
      <ItineraryProfile
        user={infoTravel}
        note={noteUseTravel}
        nav={true}
        className={"sm:ml-20 sm:mb-20 xs:mb-10"}
      />

      {/* Detail Trajet */}
      <div className="flex xl:flex-row xs:flex-col xs:items-center">
        <DetailTravel
          hour={String(infoTravel.hour)}
          placeView={true}
          place={infoTravel.placeAvailable}
          timeArrive={itinerary.arrivedTime}
          timeTravel={duration}
          streetStart={itinerary.streetStart}
          zipStart={itinerary.zipStart}
          cityStart={itinerary.cityStart}
          price={infoTravel.price}
          streetEnd={itinerary.streetEnd}
          zipEnd={itinerary.zipEnd}
          cityEnd={itinerary.cityEnd}
          walletView={true}
          km={itinerary.km}
        />

        <DetailsPreference
          smoke={infoTravel.smoking}
          music={infoTravel.music}
          talk={infoTravel.discuss}
        />
      </div>

      {hasRole === "ADMIN" && (
        <>
          <TravelPassengers infoId={infoTravel.id} />
        </>
      )}

      {infoTravel?.mail === hasUser?.username && (
        <>
          <TravelPassengers infoId={infoTravel.id} />
        </>
      )}

      {/* MAP */}
      <div className="bg-primary xl:p-8">
        <div className="p-10 ml-10">
          <h3>
            Itinéraire {itinerary.cityStart} - {itinerary.cityEnd} (
            {itinerary.km} km)
          </h3>
        </div>
        <div>
          {startCoordinates && endCoordinates && (
            <Map StartCity={startCoordinates} EndCity={endCoordinates} />
          )}
        </div>
      </div>

      {/* USER CAR */}
      <h4 className="xl:ml-20 sm:ml-10 xs:ml-6 mt-10 font-bold">
        Détails du <span className="bg-primary p-1">véhicule</span>
      </h4>
      <GetCarInformations car={infoTravel} />
      {/* RESERVATION BUTTON */}
      <div className="flex justify-center items-center gap-10 xs:mt-10 sm:mt-0">
        <ButtonBackPage onClick={goBack} />
        {isLoggued ? (
          <Button
            label={
              !noPlace && timeTravel > time
                ? "Reserver le trajet"
                : "Ce trajet est indisponible"
            }
            className={
              !noPlace && timeTravel > time
                ? "bg-secondary"
                : "bg-gray-400 cursor-not-allowed"
            }
            disabled={!noPlace && timeTravel > time ? false : true}
            onClick={confirmTravel}
          />
        ) : (
          <>
            <Button
              label={
                !noPlace && timeTravel > time
                  ? "Connectez-vous pour réserver"
                  : "Ce trajet est indisponible"
              }
              className=" bg-gray-400 cursor-not-allowed"
              title={
                !noPlace && timeTravel > time
                  ? "Vous devez être connecté"
                  : "Ce trajet est indisponible"
              }
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ItineraryDetails;
