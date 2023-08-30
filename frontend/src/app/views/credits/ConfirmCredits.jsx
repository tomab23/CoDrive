import React, { useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  URL_BUY_CREDITS,
  URL_CREDITS,
  URL_ERROR_404,
  URL_OFFER_CREDIT,
  URL_RECAP_BUY_CREDITS,
  URL_RECAP_SELL_CREDITS,
  URL_SELL_CREDITS,
} from "../../constants/urls/urlFrontEnd";
import Button from "../../components/Custom/Button";
import ImageCredits from "../../components/credits/ImageCredits";
import Footer from "../../components/layouts/Footer";
import {
  newTransaction,
  postStripe,
  updatePoints,
} from "../../api/backend/account";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayementChoice from "../../components/credits/PayementChoice";
import CreditCard from "../../components/credits/CreditCard";
import RecapTransaction from "../../components/credits/RecapTransaction";
import ButtonBackCredits from "../../components/credits/ButtonBackCredits";
import ReturnButton from "../../components/ReturnButton";
import emailjs from "@emailjs/browser";
import { DateDetail } from "../../helpers/DateDetail";
import { dateToday } from "./../../helpers/DateToday";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux-store/authenticationSlice";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import apiBackEndPayment from "../../api/backend/api.BackendPayment";
import StripeButton from "../../components/stripe/StripeButton";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PUBLIC_KEY } from "../../constants/stripe";
import { ToastContainer, toast } from "react-toastify";
import closeToast from "../../components/CloseToast";
import ClipLoader from "react-spinners/ClipLoader";

const ConfirmCredits = ({ buy }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasUser = useSelector((state) => selectUser(state));

  const [pay, setPay] = useState(false);

  // Price in euro about the transaction
  const price = location.state.payement;

  // Choice of credits
  const points = location.state.value.points;

  // Update points of user
  const newCredits = buy
    ? location.state.credits + location.state.value.points
    : location.state.credits - location.state.value.points;

  // Credits update JSON
   const majCredits = {
    points: newCredits
  }

  // Email parameters to buy or sell credits (codrive2)
  const yourServiceId = "service_5ktpcdd";
  const yourTemplateId = "template_d23u48x";
  const yourPublicId = "TNZjyQl8IgfvcCn7i";
  /**
   * Function to send the email.
   * @param {*} values values of recap
   */
  const sendMail = (values) => {
    emailjs
      .send(yourServiceId, yourTemplateId, values, yourPublicId)
      .then((result) => {
        console.log("result", result);
      })
      .catch((e) => {
        console.log(e.code);
      });
  };

  // informations about the mail to send
  const recapMail = {
    mail: hasUser.username,
    date: DateDetail(dateToday()),
    result: buy ? "achat" : "vente",
    text: buy ? "achetez" : "vendu",
    points: location.state.value.points,
    final: buy ? "dépensez" : "gagnez",
    payement: location.state.payement,
    credits: newCredits,
  };

  // informations about the transaction for the data base
  const transaction = {
    credits: points,
    payement: location.state.payement,
    buy: buy ? true : false,
    description: buy ? "Achat de crédits" : "Vente de crédits",
    transactionalDate: dateToday(),
  };

  const handleSell = () => {
    updatePoints(majCredits)
      .then(() => {
        newTransaction(transaction).catch((e) => alert(e.code));
        sendMail(recapMail);
        {!buy &&
            navigate(URL_RECAP_SELL_CREDITS, {
                state: {
                  credits: newCredits,
                  points: points,
                  travel: location.state.travel,
                  euro: price,
                },
              });
        }
      })
      .catch((e) => {
        console.log(e.code);
        navigate(URL_ERROR_404);
      });
  };


  const stepBack = () => {
    if (location.state?.offer === true) {
      navigate(URL_OFFER_CREDIT, {
        state: { home: location.state.home, travel: location.state.travel },
      });
    } else {
      if (buy) {
        navigate(URL_BUY_CREDITS, {
          state: {
            value: location.state.value.points,
            credits: location.state.credits,
            travel: location.state.travel,
          },
        });
      } else {
        navigate(URL_SELL_CREDITS, {
          state: {
            value: location.state.value.points,
            credits: location.state.credits,
          },
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
{pay ? (
  <div className="flex flex-col items-center justify-center my-20 gap-20">
      <h4>veuillez patienter...</h4>
    <ClipLoader
          color="#23645A"
          // #92E3A9  #23645A
          loading={true}
          size={50}
        />
  </div>
) : (
  <div>
  <h4 className="font-bold ml-20 mt-10">
    {buy ? "Acheter des crédits" : "Vendre des crédits"}
  </h4>

  {window.innerWidth > 500 &&
    <div className="mt-10 -mb-10">
    <Button
      label="Retour"
      className={` py-1 outline outline-2 outline-dark text-dark bg-input ml-20`}
      onClick={stepBack}
    />
</div>
  }

  {/* RECAP */}
  <h5 className="text-center mt-10">
    <span className="font-bold bg-primary p-1">Récapitulatif</span>
  </h5>
  <RecapTransaction
    buy={buy}
    point={location.state.value.points}
    payement={location.state.payement}
  />

  {window.innerWidth > 500 ? (
      <h6 className="mt-20 font-semibold text-center">
      Nombre de crédit restant apres conversion : {newCredits} crédits
    </h6>
  ) : (
    <h6 className="mt-20 font-semibold text-center text-lg">
    Nombre de crédit restant apres conversion :<br/> {newCredits} crédits
  </h6>
  )}

  {/* SELL */}
  {!buy && (
      <div className="mt-20 flex justify-center
      sm:text-base sm:gap-10 
        xs:gap-3 xs:text-sm">
        <ButtonBackCredits points={location.state.credits} />
        <Button
          type="submit"
          label="Finaliser ma vente"
          className="bg-secondary"
          onClick={() => handleSell()}
        />
        
      </div>
  )}

  {/* BUY */}
  {buy && !pay && (
    <div>
      <div className="flex justify-center mt-10">
        {!pay && (
          <StripeButton
            price={price}
            mail={hasUser.username}
            setPay={setPay}
            points={points}
            sendMail={sendMail}
            recapMail={recapMail}
            transaction={transaction}
            travel={location.state.travel}
            newCredits={newCredits}
          />
        )}
        <ToastContainer
          position="top-center"
          style={{
            width: "28rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
          closeButton={closeToast}
          autoClose={10000}
        />
      </div>

          <div className="flex justify-center mt-10">
            {location.state?.travel !== undefined ? (
              <Button
                label="Revenir au trajet"
                className="py-1 border-2 border-dark text-dark bg-input"
                onClick={() =>
                  navigate(`/itinerary-detail/${location.state.travel}`)
                }
              />
            ) : (
              <ButtonBackCredits
                points={location.state}
                home={location.state?.home}
              />
            )}
          </div>
    </div>
  )}
  </div>
)}

      <ImageCredits />

      <Footer />
    </div>
  );
};

export default ConfirmCredits;
