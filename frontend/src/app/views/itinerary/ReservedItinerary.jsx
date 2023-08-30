import React from "react";
import Navbar from "../../components/layouts/Navbar";
import image from "../../assets/pictures/itinerary/réversationconfirmee.svg";
import Button from "../../components/Custom/Button";
import Footer from "../../components/layouts/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_CREDITS, URL_TRAVEL_MANAGEMENT, URL_WELCOME } from "../../constants/urls/urlFrontEnd";
import DetailTravel from "../../components/itinerary/itineraryDetail/DetailTravel";
import ItineraryProfile from "../../components/itinerary/itineraryDetail/ItineraryProfile";
import DetailsPreference from "../../components/itinerary/itineraryDetail/DetailsPreferences";
import { UserIcon } from "@heroicons/react/solid";
import Wallet from "../../components/itinerary/itineraryDetail/Wallet";

const ReservedItinerary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Contain the details of de travel
  const infoTravel = location.state.travel;
  const placeReserved = location.state.place.placeAvailable;
  const credits = location.state.credits;


  return (
    <div>
      <Navbar />
      {/* Itinerary confirm */}
      <div className="flex mt-20 
      xl:flex-row xl:justify-evenly 
      xs:flex-col xs:items-center">
        <div className="flex flex-col xs:ml-2 sm:ml-0">
          <h3 className="font-bold sm:mb-20 xs:mb-10 xl:text-4xl sm:text-3xl xs:text-2xl ">
            Votre trajet <span className="bg-primary p-1">a été réservé</span>,
            félicitations !
          </h3>

          <h6 className="sm:mb-10 xs:mb-10">
            <b>Votre trajet a été réservé.</b> Votre reçu est déjà sur votre
            boîte mail.
            <p>N’hésitez pas à consulter vos spams.</p>
          </h6>

          <h6 className="sm:mb-20 xs:mb-10">
            <b>Si l’utilisateur accepte votre réservation</b>, vos crédits
            seront débités.
            <p>
              N’hésitez pas à le contacter afin de préparer au mieux votre
              voyage.
            </p>
          </h6>

          <div className="flex  
          sm:flex-row sm:ml-20 sm:gap-10
          xs:flex-col xs:items-center xs:gap-2
           ">
            {/* <button className="bg-secondary p-1">Rechercher</button> */}
            <Button
              label="Gérer mes crédits"
              className="bg-secondary outline outline-2 outline-secondary xs:w-[60%] sm:w-auto"
              onClick={() => navigate(URL_CREDITS)}
            />
            <Button
              label="Voir mes prochains trajets"
              className="py-1 outline outline-2 outline-dark text-dark bg-input xs:w-[60%] sm:w-auto"
              onClick={() => navigate(URL_TRAVEL_MANAGEMENT)}
            />
          </div>
        </div>

        {window.innerWidth > 1024 &&
                <img
                src={image}
                alt="image de reservation réussi"
                className="w-[500px]"
              />
        }
      </div>

      {/* RESUME */}
      <div className="my-20">
        <h4 className="font-bold xl:ml-32 sm:ml-20 xs:ml-2 mb-20 xl:text-4xl sm:text-3xl xs:text-2xl">
          <span className="bg-primary p-1">Récapitulatif</span> de votre
          réservation
        </h4>
        <div className="flex 
        xl:ml-0 
        sm:ml-20 sm:gap-20 sm:flex-row
        xs:ml-10 xs:flex-col xs:gap-5">
          <DetailTravel
            hour={infoTravel.hour}
            place={infoTravel.placeAvailable}
            timeStart={infoTravel.hour}
            timeArrive={infoTravel.itinerary.arrivedTime}
            timeTravel={location.state.duration}
            streetStart={infoTravel.itinerary.streetStart}
            zipStart={infoTravel.itinerary.zipStart}
            cityStart={infoTravel.itinerary.cityStart}
            price={infoTravel.price}
            streetEnd={infoTravel.itinerary.streetEnd}
            zipEnd={infoTravel.itinerary.zipEnd}
            cityEnd={infoTravel.itinerary.cityEnd}
            walletView={true}
          />
          <DetailsPreference
            smoke={infoTravel.smoking}
            music={infoTravel.music}
            talk={infoTravel.discuss}
          />
        </div>
      </div>

{/* RECAP PLACE */}
      <div className="sm:ml-32 xs:ml-2 -mt-10 flex items-center">
        <h6>Nombre de place(s) choisi(s) : </h6>
        <h5 className="ml-2 -mr-1 font-bold">{placeReserved}</h5>
        <div className=" ml-1 flex items-center pr-2">
            <UserIcon className="w-8 h-8 p-1 relative z-40 text-black" />
          </div>
      </div>

      <div className="sm:ml-32 xs:ml-2 flex items-center">
        <h6>Prix en crédits pour ce trajet : </h6>
        <div className=" flex justify-center items-center text-lg text-black">
            <div>
              <h6 className="font-bold ml-2 mt-1">{credits} crédits</h6>
            </div>
            <div className="mt-[45px] ml-2">
            <Wallet />
            </div>
        </div>
      </div>

      

      <ItineraryProfile user={infoTravel} className={"sm:ml-32 xs:ml-2"} nav={true} />

      {/* HOME BUTTON */}
      <div className="flex justify-center xl:mt-0 sm:mt-10 xs:mt-10">
        <Button
          label="Revenir à la page d'accueil"
          className="outline outline-2 outline-dark text-dark bg-input"
          onClick={() => navigate(URL_WELCOME)}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ReservedItinerary;
