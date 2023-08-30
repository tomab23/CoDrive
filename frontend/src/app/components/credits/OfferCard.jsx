import React from 'react'
import { useNavigate } from 'react-router-dom';
import { URL_CONFIRM_BUY_CREDITS } from '../../constants/urls/urlFrontEnd';

const OfferCard = ({ credit, userCredits, home, travel }) => {

  const navigate = useNavigate();

  const price = credit * 0.1;
  const remise = price * (20/100);
  const final = price - remise;

  const goBuy = () => {
    navigate(URL_CONFIRM_BUY_CREDITS, {
      state: {
        payement: final,
        offer: true,
        credits: userCredits,
        value: { points: credit },
        home: home,
        travel: travel
      }
    })
  }

  return (
    <div onClick={goBuy} className="w-80 h-36 rounded-xl bg-primary hover:scale-105 shadow-md cursor-pointer flex flex-col items-center gap-5">
    <h5 className="mt-5 font-bold">Offre {credit} crédits</h5>
    <h6>{final}€ au lieu de {price}€ !</h6>
  </div>
  )
}

export default OfferCard
