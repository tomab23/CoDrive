import React from 'react'
import Wallet from "../../components/itinerary/itineraryDetail/Wallet";
import Separator from '../Separator';

const RecapTransaction = ({ buy, point, payement, }) => {
  return (
    <div className="flex justify-center font-bold mt-10">
    <div className="flex flex-col items-center ">
      <h6 className="font-bold">
        Nombre de crédits {buy ? "désirés" : "à vendre"}
      </h6>
      {/* NUMBER CREDITS */}
      <div className="flex self-start mt-5 justify-center items-center gap-8 ">
        <div className="-mb-12 ">
          <Wallet size={"h-10 w-10"} />
        </div>
        <div>
          <p>
            {buy ? "+" : "-"}
            {point}
          </p>
          <p>crédits</p>
        </div>
      </div>
      <Separator className={"w-60 h-[0.2px]"} />
      <h6 className="self-start">
        {buy ? "Total à dépenser" : "Conversion à recevoir"}
      </h6>
      <p className="self-end my-3">{payement} €</p>
    </div>
  </div>
  )
}

export default RecapTransaction
