import React from "react";
import Navbar from "../../layouts/Navbar";
import InfoConnectedChange from "../InfoConnectedChange";
import CardTravelProfile from "../CardTravelProfile";
import Notice from "../Notice/Notice";
import Footer from "../../layouts/Footer";
import Button from "../../Custom/Button";
import voiture2 from "../../../assets/pictures/profile/voiture2.svg"
import { useNavigate } from "react-router-dom";
import {
  URL_PROFILE_CHANGE,
  URL_PASSWORD_CHANGE,
  URL_ACCOUNT_DELETE,
  URL_ACCOUNT_DISABLE,
} from "../../../constants/urls/urlFrontEnd";

const ProfilePassenger = () => {
  const navigate = useNavigate();

  return (
    <div className="ProfilePassengerView">
      {/*navbar component*/}
      <Navbar />

      {/*secion 1 mon tableau de bord*/}
      <div className="flex">
        <InfoConnectedChange></InfoConnectedChange>

        {/*Section lien pour modifier le profil*/}
        <div className="text-right text-dark font-bold absolute right-20 top-[350px]">
          <h5
            className="cursor-pointer"
            onClick={() => navigate(URL_PROFILE_CHANGE)}
          >
            Modifier mes informations
          </h5>
          <h5
            className="my-7 cursor-pointer"
            onClick={() => navigate(URL_PASSWORD_CHANGE)}
          >
            Modifier mon mot de passe
          </h5>
          <h5
            className="mb-7 cursor-pointer"
            onClick={() => navigate(URL_ACCOUNT_DISABLE)}
          >
            Désactiver mon compte
          </h5>
          <h5
            className="cursor-pointer"
            onClick={() => navigate(URL_ACCOUNT_DELETE)}
          >
            Supprimer mon compte
          </h5>
        </div>
      </div>
      {/*section 2 Partie sur les prochains trajets programmés*/}
      <div className="bg-primary mt-24 block">
        <h3 className="pt-12 ml-20 font-bold">
          Les prochains trajets programmés
        </h3>

        <div className="flex h-96 justify-between items-center mx-36">
          <CardTravelProfile travelDate="Aujourd'hui"></CardTravelProfile>
          <CardTravelProfile travelDate="Demain"></CardTravelProfile>
        </div>
        <div className="flex justify-center item-center pb-16">
          <Button
            onClick={() => alert(" => consulter les réservations")}
            label={"Consulter les réservations"}
            className={"bg-secondary font-bold text-xl mr-4"}
          ></Button>
        </div>
      </div>

      {/*section 3 */}
      <div className="mt-36 mx-20">
        <h3 className="font-bold">
          Vous n'êtes <span className="bg-primary">pas véhiculé ?</span>
        </h3>
        <div className="grid grid-cols-2 gap-32">
          <div className="mt-20 font-medium">
            <h5>
              Vous ne possédez pas de permis B ? Ce n’est pas un problème.
              CoDrive vous permet{" "}
              <span className="text-dark font-bold">d’acheter vos crédits</span>{" "}
              afin de{" "}
              <span className="font-bold">
                profiter des services de la plateforme.
              </span>
            </h5>
            <h5 className="mt-4">
              <span className="font-bold">Si vous obtenez votre permis</span>
              après inscription, il est possible de changer vos paramètres{" "}
              <span className="font-bold">en modifiant vos informations.</span>
            </h5>
            <div className="text-center mt-16">
        <Button
              label={"Modifier mes informations"}
              className={"bg-secondary text-xl ml-12"}
              onClick={() => alert("modifier détails voiture")}
            ></Button>
            </div>
          </div>
          <div >
            <img src={voiture2}></img>
          </div>
        </div>        
      </div>
      {/*sdection 4 Partie sur les avis*/}
      <div className="">
      <Notice className={"top-[2200px]"}></Notice>
      </div>
      <div className="absolute top-[2800px] w-full">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ProfilePassenger;
