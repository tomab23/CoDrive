import React, { useState, useEffect } from "react";
import InfoConnectedChange from "../InfoConnectedChange";
import Navbar from "../../layouts/Navbar";
import Button from "../../Custom/Button";
import Notice from "../Notice/Notice";
import Footer from "../../layouts/Footer";
import pen from "../../../assets/pictures/profile/pen.svg";
import CardTravelProfile from "../CardTravelProfile";
import CarDetailsOverall from "../Car/CarDetailsOverall";
import CarDetailsChange from "../Car/CarDetailsChange";
import { profile } from "../../../api/backend/account";
import UnloadedCar from "../Car/UnloadedCar";
import SliderCar from "../../itinerary/itineraryDetail/SliderCar";
import { useNavigate } from "react-router-dom";
import ImportFileButton from "../Car/ImportFileButton";
import {
  URL_CREATE_TRAVEL,
  URL_SEARCH_LIST,
} from "../../../constants/urls/urlFrontEnd";

const ProfileDriver = () => {
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [user, setUser] = useState();
  const [nbCar, setNbCar] = useState();
  const [nbNextTravels, setNbNextTravels] = useState();
  const [listNextTravel, setListNexTravel] = useState([]);
  const [nbNextBooking, setNbNextBooking] = useState();
  const [listNextBooking, setListNextBooking] = useState([]);
  const [showTravel, setShowTravel] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then((res) => {
        setUser(res.data);
        setNbNextTravels(res.data.listNextTwoTravels.length);
        setListNexTravel(res.data.listNextTwoTravels);
        setNbNextBooking(res.data.listNextTwoBookings.length);
        setListNextBooking(res.data.listNextTwoBookings);
        setNbCar(res.data.car.length);
      })
      .catch(() => setErrorLog(true));
  }, []);

  return (
    <div className="ProfilView">
      {/*navbar component*/}
      <Navbar />

      {/*secion 1 mon tableau de bord*/}
      <InfoConnectedChange></InfoConnectedChange>

      {/*section 2 Partie sur les prochains trajets programmés*/}
      <div className="bg-primary mt-24 block">
        <div className="flex">
          {showTravel ? (
            <div>
              <div className="flex">
                <h6 className="ml-20 pt-12 font-bold cursor-pointer">
                  Les prochains trajets programmés
                </h6>
                <h5
                  className="ml-12 mt-14 font-bold cursor-pointer text-dark"
                  onClick={() => setShowTravel(!showTravel)}
                >
                  Voir les prochains trajets réservés
                </h5>
              </div>
              {nbNextTravels == 0 ? (
                <div className="grid h-[250px] place-items-center mt-12">
                  <h4>Vous n'avez aucun trajet programmé</h4>
                </div>
              ) : (
                <div className="flex gap-6 h-96 justify-between items-center mx-36">
                  {listNextTravel
                    .map((c, index) => (
                      <div key={c.id}>
                        <CardTravelProfile
                          user={user}
                          index={index}
                        />
                      </div>
                    ))
                    .reverse()}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex">
                <h5
                  className="ml-20 pt-14 font-bold cursor-pointer text-dark"
                  onClick={() => setShowTravel(!showTravel)}
                >
                  Voir les prochains trajets programmés
                </h5>
                <h3 className="ml-12 mt-12 font-bold cursor-pointer">
                  Les prochains trajets réservés
                </h3>
              </div>
              {nbNextBooking == 0 ? (
                <div className="grid h-[250px] place-items-center mt-12">
                  <h4>Vous n'avez aucune réservation en cours</h4>
                </div>
              ) : (
                <div className="flex gap-6 h-96 justify-between items-center mx-36">
                  {listNextBooking
                    .map((c, index) => (
                      <CardTravelProfile key={c.id} user={user} index={index} />
                    ))
                    .reverse()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center item-center pb-16">
          <Button
            onClick={() => navigate(URL_SEARCH_LIST)}
            label={"Effectuer une réservation"}
            className={"bg-secondary font-bold text-xl mr-4"}
          ></Button>
          <Button
            onClick={() => navigate(URL_CREATE_TRAVEL)}
            label={"Programmer un trajet"}
            className={
              "text-dark font-bold text-xl ml-4 border-solid border-4 border-dark"
            }
          ></Button>
        </div>
      </div>

      {/*section 3 Détails du véhicule*/}
      <div className="mt-24">
        <div className="flex justify-start">
          {nbCar == 0 ? (
            <h3 className="ml-20 font-bold">
              Enregistrer <span className="bg-primary">votre véhicule</span>
            </h3>
          ) : (
            <h3 className="ml-20 font-bold">
              Détails du <span className="bg-primary">véhicule</span>
            </h3>
          )}

          {showCarDetails || nbCar == 0 ? (
            ""
          ) : (
            <img
              src={pen}
              className="h-4 mt-5 ml-5 cursor-pointer"
              onClick={() => setShowCarDetails(!showCarDetails)}
            ></img>
          )}
          {showCarDetails && (
            <Button
              label={"Valider les modifications"}
              className={"bg-secondary text-xl ml-12 -mt-0.5"}
              onClick={() => setShowCarDetails(!showCarDetails)}
            ></Button>
          )}
          {nbCar == 0 && (
            <Button
              label={"Valider les modifications"}
              className={"bg-secondary text-xl ml-12 -mt-0.5"}
              onClick={() => {
                setShowCarDetails(true);
                navigate("/profile");
              }}
            ></Button>
          )}
        </div>
      </div>

      <div className="absolute top-[1660px]">
        {showCarDetails && nbCar > 0 ? (
          <div>
            <CarDetailsChange component={<SliderCar />} />
            <div className="ml-[250px]">
              <ImportFileButton />
            </div>
          </div>
        ) : nbCar == 0 && showCarDetails == false ? (
          <UnloadedCar />
        ) : (
          <CarDetailsOverall></CarDetailsOverall>
        )}
      </div>

      {/*sdection 4 Partie sur les avis*/}
      {/* <Notice className={"top-[2300px]"}></Notice> */}
      <div className="absolute top-[2900px] w-full">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ProfileDriver;
