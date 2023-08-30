import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import OfferCard from "../../components/credits/OfferCard";
import { useLocation, useNavigate } from "react-router-dom";
import { getCredits } from "../../api/backend/account";
import Button from "../../components/Custom/Button";
import {
  URL_BUY_CREDITS,
  URL_ERROR_404,
  URL_WELCOME,
} from "../../constants/urls/urlFrontEnd";
import HashLoader from "react-spinners/HashLoader";

const OfferCredit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [credits, setCredits] = useState();

  useEffect(() => {
    getCredits()
      .then((res) => {
        setCredits(res.data);
      })
      .catch((e) => {
        console.log("error = ", e.code);
        if (e.code === "ERR_NETWORK") {
          navigate(URL_ERROR_404, {
            state: {
              error: true,
              code: "ERR_NETWORK",
            },
          });
        } else {
          navigate(URL_ERROR_404);
        }
      });
  }, []);

  console.log("offre", credits);

  return (
    <div>
      <Navbar />

      <h4 className="font-bold my-10 
      xl:ml-20 xl:text-3xl
      sm:ml-10 sm:text-2xl
      xs:ml-6 xs:text-lg">
        Nos <span className="bg-primary p-1">offres</span> - 20% de remise sur
        les offres !
      </h4>

      {window.innerWidth > 500 && (
        <>
          {location.state?.home ? (
            <Button
              label="Retour à l'accueil"
              className={` py-1 outline outline-2 outline-dark text-dark bg-input xl:ml-20 sm:ml-10 -mb-10`}
              onClick={() => navigate(URL_WELCOME)}
            />
          ) : (
            <Button
              label="Retour"
              className={` py-1 outline outline-2 outline-dark text-dark bg-input xl:ml-20 sm:ml-10 -mb-10`}
              onClick={() =>
                navigate(URL_BUY_CREDITS, {
                  state: { credits: credits, travel: location.state?.travel },
                })
              }
            />
          )}
        </>
      )}

      {credits === undefined ? (
        // TODO
        <div className="flex justify-center mt-[135px]">
          <HashLoader
            color="#23645A"
            // #92E3A9  #23645A
            loading={true}
            size={150}
          />
        </div>
      ) : (
        <>
          <div className="flex  mb-20 
          xl:mt-0 xl:gap-36
          sm:mt-10 sm:gap-12 sm:flex-row sm:justify-center
          xs:flex-col xs:items-center xs:mb-5 xs:gap-5">
            <OfferCard
              credit={200}
              userCredits={credits}
              home={location.state?.home}
              travel={location.state?.travel}
            />
            <OfferCard
              credit={400}
              userCredits={credits}
              home={location.state?.home}
              travel={location.state?.travel}
            />
          </div>
          <div className="flex mb-20 
          xl:mt-0 xl:gap-36
          sm:mt-10 sm:gap-12 sm:flex-row sm:justify-center
          xs:flex-col xs:items-center xs:gap-5">
            <OfferCard
              credit={600}
              userCredits={credits}
              home={location.state?.home}
              travel={location.state?.travel}
            />
            {/* <OfferCard credit={800} userCredits={credits} home={location.state?.home} travel={location.state?.travel} /> */}
            <OfferCard
              credit={1000}
              userCredits={credits}
              home={location.state?.home}
              travel={location.state?.travel}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OfferCredit;
