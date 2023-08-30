import React from 'react'
import wallet from "../../../assets/pictures/Detail/wallet.svg";

const Wallet = ({ size }) => {
  return (
    <div className={`mb-10 w-7 h-7 ${size}`}>
    <img src={wallet} />
  </div>
  )
}

export default Wallet
