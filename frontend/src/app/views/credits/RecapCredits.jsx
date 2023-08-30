import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import Wallet from "../../components/itinerary/itineraryDetail/Wallet";
import Separator from "../../components/Separator";
import { URL_CREDITS } from "../../constants/urls/urlFrontEnd";
import Button from "../../components/Custom/Button";
import ImageCredits from "../../components/credits/ImageCredits";
import Footer from "../../components/layouts/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { getCredits } from "../../api/backend/account";
import RecapTransaction from "../../components/credits/RecapTransaction";
import ButtonBackCredits from "../../components/credits/ButtonBackCredits";

const RecapCredits = ({ buy }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userPoints, setUserPoints] = useState("");

  console.log(location.state);

  useEffect(() => {
    getCredits()
      .then((res) => {
        setUserPoints(res.data);
      })
      .catch((e) => {
        console.log("error = ", e.code);
      });
  }, []);

  const backCredits = () => {
    navigate(URL_CREDITS, {
      state: {
        points: userPoints,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <h4 className="font-bold ml-20 mt-10">
        {buy ? "Acheter des crédits" : "Vendre des crédits"}
      </h4>

      <h5 className="font-bold text-center mt-10 sm:text-2xl xs:text-xl">
        Félicitations,
        <span className="bg-primary p-1">
          {buy ? "vos crédits sont arrivés !" : "vos crédits ont été vendus "}
        </span>
      </h5>

      {/* UPDATE CREDITS */}
      <div className="mt-12">
        <h6 className="font-bold text-center">Votre solde actuel</h6>
        <div className="flex justify-center items-center gap-8 font-bold mt-5">
          <div className="-mb-12 ">
            <Wallet size={"h-10 w-10"} />
          </div>
          <div>
            <p> {location.state.credits} </p>
            <p>crédits</p>
          </div>
        </div>
      </div>

      {/* RECAP */}
      <h5 className="text-center mt-28 font-bold">
        Récapitulatif de votre {buy ? "commande" : "vente"}
      </h5>
      <RecapTransaction buy={buy} point={location.state.points} payement={location.state.euro} />

      <div className="mt-20 flex justify-center">
        <ButtonBackCredits points={userPoints} />

        {location.state?.travel !== undefined && (
          <Button
            label="Revenir au trajet"
            className="py-1 border-2 border-dark text-dark bg-input ml-10"
            onClick={() => navigate(`/itinerary-detail/${location.state.travel}`)}
          />
        )}
      </div>

      <ImageCredits />

      <Footer />
    </div>
  );
};

export default RecapCredits;
