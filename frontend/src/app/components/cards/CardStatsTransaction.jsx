import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

const CardStatsTransaction = ({ title, number, loading, booking }) => {
  return (
    <div className={booking ? "bg-gray-200 h-24 w-36 rounded-lg flex flex-col justify-start items-start text-center  hover:scale-110 gap-3 shadow-lg p-1" : "bg-gray-300 h-24 w-36 rounded-lg flex flex-col justify-start items-start text-center  hover:scale-110 gap-3 shadow-lg p-1"}>
    <p className=" text-xs font-semibold">{title}</p>
    <div className="w-full text-2xl font-bold">
    {!loading ? (
        <p>{number}</p>
    ) : (
        <PulseLoader
        color="#000"
        // #92E3A9  #23645A
        loading={true}
        size={10}
      />
    )}
    </div>
    
  </div>

  )
}

export default CardStatsTransaction
