import React, { useEffect, useState } from "react";
import MenuProfil from "./MenuProfil";
import ItineraryProfile from "../../itinerary/itineraryDetail/ItineraryProfile";
import PrefBio from "./PrefBio";

const PartProfile = ({user, isUser}) => {

  return (
    <div className="xl:ml-10 flex sm:flex-row xs:flex-col xs:items-center  sm:justify-between xl:px-10 sm:px-8 xs:px-2">
     <div className="">
      <ItineraryProfile user={user} className={"mb-5"} />
      {/* Content preferences, credits and bio */}
      <PrefBio user={user} isUser={isUser} />
     </div>
     <div className="pt-14">
     {isUser &&
     <MenuProfil user={user} />
     }
     </div>
    </div>
  )
}

export default PartProfile
