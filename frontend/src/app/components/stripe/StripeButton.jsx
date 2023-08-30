import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PUBLIC_KEY } from "../../constants/stripe";
import { newTransaction, postStripe, updatePoints } from "../../api/backend/account";
import { cardError } from "./NotifyStripe";
import { useNavigate } from "react-router-dom";
import { URL_ERROR_404, URL_RECAP_BUY_CREDITS } from "../../constants/urls/urlFrontEnd";
import logo from "../../assets/pictures/credits/logoCb.png"

const StripeButton = (props) => {

  const { price, setPay, newCredits, sendMail, recapMail, transaction, points, travel, mail } = props;

  const navigate = useNavigate()

  /**
   * For the message with toastify.
   */
  const toastId = React.useRef(null);

   // Credits update
   const majCredits = {
    points: newCredits
  }

    const onToken = (token) => {
      console.log(token);
      const stripeInfo = {
        amount: price,
        token: token
      }
      setPay(true);
      postStripe(stripeInfo)
        .then((response) => {
          if (String(response.data).startsWith("Your card was declined")) {
            cardError(toastId, "Votre carte est refusée");
            setPay(false);
          } else if (String(response.data).startsWith("Your card has expired")) {
            cardError(toastId, "Votre carte est expirée");
            setPay(false);
          } else if (String(response.data).startsWith("Your card's security code is incorrect")) {
            cardError(toastId, "Votre code de sécurité (CVC) est incorrect");
            setPay(false);
          } else if (String(response.data).startsWith("An error occurred while processing your card")) {
            cardError(toastId, "Une erreur de traitement est survenue");
            setPay(false);
          } else {
            console.log(response.data);
            updatePoints(majCredits).catch("ERREUR maj point");
            newTransaction(transaction).catch("ERREUR transaction");
            sendMail(recapMail);
            navigate(URL_RECAP_BUY_CREDITS, {
              state: {
                credits: newCredits,
                points: points,
                travel: travel,
                euro: price,
              }})
          }

        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "ERR_NETWORK") {
            navigate(URL_ERROR_404, {
              state: {
                error: true,
                code: "ERR_NETWORK"
              }})
          }

        });
    };

  


  return (
    <>
    <StripeCheckout
      amount={price * 100}
      label="PAYER"
      email={mail}
      name="Achat de crédits"
      image={logo}
      description={`Total à payer pour ${points} crédits`}
      // ${price}€
      panelLabel="Payer"
      token={onToken}
      stripeKey={STRIPE_PUBLIC_KEY}
      currency="EUR"
    />

  </>
  )
}

export default StripeButton
