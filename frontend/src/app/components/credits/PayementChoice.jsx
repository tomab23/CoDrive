import React from 'react'
import paypalLogo from "../../assets/pictures/credits/logos_paypal.svg";
import visa from "../../assets/pictures/credits/logos_visa.svg";
import mastercard from "../../assets/pictures/credits/logos_mastercard.svg";

const PayementChoice = ({ setPaypal, setCard}) => {
  return (
    <div className="flex justify-center gap-14 mt-10">
    <img
      src={paypalLogo}
      alt="paypal logo"
      className="h-14 w-14 cursor-pointer"
      onClick={() => {
        setCard(false);
        setPaypal(true);
      }}
    />
    <img
      src={mastercard}
      alt="mastercard logo"
      className="h-14 w-14 cursor-pointer"
      onClick={() => {
        setPaypal(false);
        setCard(true);
      }}
    />
    <img
      src={visa}
      alt="visa logo"
      className="h-14 w-14 cursor-pointer"
      onClick={() => {
        setPaypal(false);
        setCard(true);
      }}
    />
  </div>
  )
}

export default PayementChoice
