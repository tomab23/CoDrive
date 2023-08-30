import React from "react";
import Footer from "./../components/layouts/Footer";
import error from "../assets/pictures/404.svg";
import Button from "./../components/Custom/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_WELCOME } from "../constants/urls/urlFrontEnd";

const ErrorView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {/* BODY */}
      <div className="flex  h-[613px]
      xl:flex-row xl:justify-center xl:gap-52 xl:mt-0
      
      xs:flex-col xs:items-center">
        {/* IMAGE */}
        <div className="flex items-center xl:mt-0 xl:mb-0 xs:mt-20 xs:mb-10">
          <img src={error} alt="Image d'erreur" className="xl:h-96 sm:h-60 xs:h-60" />
        </div>

        {/* MESSAGE + BUTTON */}
        <div className="flex w-[28rem] flex-col justify-center
        xl:items-start 
        xs:items-center ">
          <div className=" font-bold mb-10 
          xl:text-3xl
          sm:text-2xl
          xs:text-lg">
            <p>Oups,</p>
            {window.innerWidth > 1080 &&
            <br />
            }
            {location.state?.error ? (
              <p>Une<span className="bg-primary p-1">Erreur</span> est survenue, veuillez nous excusez</p>
            ) : (
              <p>Vous avez fais <span className="bg-primary p-1">fausse route!</span></p>
            )}
          </div>

          <p className="text-xl text-black mb-10">
            Pas de panique, le demi tour est possible
          </p>

          {location.state?.code !== undefined &&
          <p className="italic self-center text-sm
          xl:mr-14 xl:mb-10">
            code : {location.state?.code}
          </p>
          }

          <Button
            label={"Revenir à l'accueil"}
            onClick={() => navigate(URL_WELCOME)}
            className="text-lg bg-secondary self-center xl:mr-14 "
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="xl:-mt-40 sm:-mt-20 xs:-mt-40">
      <Footer />
      </div>
     
    </div>
  );
};

export default ErrorView;
