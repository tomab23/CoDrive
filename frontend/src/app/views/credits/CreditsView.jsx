import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import creditsImage from "../../assets/pictures/credits/credits.svg";
import { getCredits } from "../../api/backend/account";
import Wallet from "../../components/itinerary/itineraryDetail/Wallet";
import Button from "../../components/Custom/Button";
import Footer from "../../components/layouts/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  URL_BUY_CREDITS,
  URL_SELL_CREDITS,
} from "../../constants/urls/urlFrontEnd";
import PulseLoader from "react-spinners/PulseLoader";
import ReturnButton from "../../components/ReturnButton";

const CreditsView = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [credits, setCredits] = useState();
  const [error, setError] = useState(false);

console.log(location.state);

  useEffect(() => {
    // if (location.state?.points === undefined) {
    //   setError(true);
    // } else { 
        getCredits()
          .then((res) => {
            setError(false);
            setCredits(res.data);
            
          })
          .catch((e) => {
            console.log("error = ", e.code);
            if (e.code === "ERR_NETWORK") {
              setError(true);
            }
          });
    // }
  }, []);



  return (
    <div>
      <Navbar />

    {window.innerWidth > 500 && 
          <div className="mt-5">
          <ReturnButton className={"xl:ml-20 sm:ml-10"} />
          </div>
    }

      <h4 className=" mb-10 font-bold
      xl:ml-20
      sm:ml-10 sm:mt-5 sm:text-3xl
      xs:ml-6 xs:mt-10 xs:text-xl">
        Votre <span className="bg-primary p-1">portefeuille</span>
      </h4>

     

      {/* BODY CREDITS & IMAGE */}
      <div className="flex 
      xl:ml-20 xl:flex-row xl:justify-start xl:gap-56
      sm:ml-10 sm:flex-col sm:items-center
      xs:ml-2">
        {/* TEXT & CREDITS */}
        <div className=" h-96  flex flex-col mt-5 xl:min-w-[550px] xs-mx-auto xs:px-3 sm:px-0 ">
          <h6 className="sm:text-xl xs:text-lg">
            Utiliser <b>CoDrive</b> pour vos déplacements, c’est{" "}
            <b>économiser</b>
          </h6>
          <h6 className="sm:mb-10 xs:mb-5 sm:text-xl xs:text-lg">
            <b>votre argent en partageant vos trajets</b> avec les autres
            utilisateurs.
          </h6>

          <h6 className="sm:text-xl xs:text-lg"> 
            Vous avez un trajet de prévu ? <b>Proposez le et remportez</b>
          </h6>
          <h6 className="sm:text-xl xs:text-lg">
            <b>des crédits à utiliser sur un autre itinéraire.</b> Si vous ne
          </h6>
          <h6 className="sm:text-xl xs:text-lg">souhaitez pas être passager et dépenser vos crédits, vous</h6>
          <h6 className="sm:text-xl xs:text-lg">
            pouvez <b>les vendre aux autres utilisateurs de la plateforme.</b>
          </h6>

          <div className="self-center sm:mt-20 xs:mt-14 font-bold">
            <h5>Votre solde actuel</h5>

            {!error ? (
              <div className="flex justify-center mt-3">
                <Wallet />
                <div>
                  {credits === undefined ? (
                                <PulseLoader
                                color="#23645A"
                                // #92E3A9  #23645A
                                loading={true}
                                size={10}
                                className="ml-5"
                              />
                  ) : (
                    <p className="ml-3">{location.state?.point !== undefined ? location.state.point : credits} crédits</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-red-500 ml-3 mt-2">Une erreur est survenue</p>
            )}
          </div>
        </div>

        {/* IMAGE */}
        {window.innerWidth > 1280 &&
        <img src={creditsImage} alt="" className="xl:h-[400px]" />
        }
      </div>

      <div className="sm:mt-20 xs:mt-40 flex justify-center sm:gap-10 xs:gap-5">
        <Button
          label="Acheter des crédits"
          className={!error ? "bg-secondary" : "bg-gray-400 cursor-not-allowed"}
          onClick={() => navigate(URL_BUY_CREDITS, {state: {credits: credits}})}
          disabled={credits === undefined}
        />
        <Button
          label="Vendre vos crédits"
          className={!error ? "py-1 border-2 border-dark text-dark bg-input" : "py-1 bg-gray-400  cursor-not-allowed" }
          onClick={() => navigate(URL_SELL_CREDITS, {state: {credits: credits}})}
          disabled={credits === undefined}
        />
      </div>

      <div className="bg-primary flex justify-center mt-20">
        <div className="my-16 sm:ml-0 sm-px-0 xs:ml-6 xs:px-1 ">
          <h4 className="font-bold mb-10 sm:text-3xl xs:text-2xl">Quel est l'avantage des crédits ?</h4>

          <h6>
            Chez <b>CoDrive</b>, nous privilégions le contact humain et la{" "}
          </h6>

          <h6>préservation de l’environnement au profit financier. Le </h6>
          <h6>
            crédit est <b>la monnaie virtuelle de la plateforme</b>, remporté{" "}
          </h6>
          <h6>
            dès <b>l’enregistrement de votre trajet sur la plateforme.</b> Les{" "}
          </h6>
          <h6>vendre aux utilisateurs vous permet de convertir vos crédits</h6>
          <h6>en argent réel, versé directement sur votre compte</h6>
          <h6>bancaire, Paypal...</h6>
        </div>
      </div>

      <div className="-mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default CreditsView;
