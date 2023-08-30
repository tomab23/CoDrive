import React, { useState } from "react";
import {
  URL_CREATE_TRAVEL,
  URL_SEARCH_LIST,
  URL_TRAVEL_MANAGEMENT,
} from "../../../constants/urls/urlFrontEnd";
import CardTravelProfile from "../../Dashboard/CardTravelProfile";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Custom/Button";

const NextTravels = (props) => {
  const {
    listNextBooking,
    nbNextBooking,
    listNextTravel,
    nbNextTravels,
    user,
    isUser,
    hasRole,
  } = props;
console.log("LLLAAAA", listNextBooking[0]?.user?.id
);
  const navigate = useNavigate();
  const [showTravel, setShowTravel] = useState(true);

  return (
    <div>
      {/*section 2 Partie sur les prochains trajets programmés*/}
      <div className="bg-primary mt-24 block">
        {isUser && window.innerWidth > 1020 ? (
          <div className="text-right pr-5 pt-2 italic font-bold">
            <Link className="hover:underline" to={URL_TRAVEL_MANAGEMENT}>
              Gestion des trajets
            </Link>
          </div>
        ) : (
          <h6 className="h-10"></h6>
        )}
        {/* <div className="flex"> */}
        <div className="">
          {showTravel ? (
            <div>
              <div className="flex">
                <h5 className="xl:ml-20 sm:ml-10 xs:ml-6 xl:text-2xl sm:text-xl xs:text-lg font-bold cursor-default">
                  Les prochains trajets programmés
                </h5>
                {isUser && (
                  <h5
                    className="xl:ml-20 sm:ml-10 xs:ml-6 xl:text-2xl sm:text-xl xs:text-lg font-bold cursor-pointer text-dark"
                    onClick={() => setShowTravel(!showTravel)}
                  >
                    Voir les prochains trajets réservés
                  </h5>
                )}
              </div>
              {nbNextTravels == 0 ? (
                <div className="flex h-[250px] items-center justify-center">
                  {isUser ? (
                    <h4 className="xl:text-2xl xs:text-xl">Vous n'avez aucun trajet programmé</h4>
                  ) : (
                    <h4>Aucun trajet programmé</h4>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center mx-36 h-80 
                xl:flex-row xl:gap-20 xl:mt-0
                sm:gap-10 xs:mt-5
                xs:flex-col xs:gap-10  ">
                  {listNextTravel.map((c, index) => (
                    <div key={c.id}>
                      <CardTravelProfile
                        user={user}
                        index={index}
                        driver={true}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex">
                <h5
                  className="xl:ml-20 sm:ml-10 xs:ml-6 xl:text-2xl sm:text-xl xs:text-lg font-bold cursor-pointer text-dark"
                  onClick={() => setShowTravel(!showTravel)}
                >
                  Voir les prochains trajets programmés
                </h5>
                <h5 className="xl:ml-20 sm:ml-10 xs:ml-6 xl:text-2xl sm:text-xl xs:text-lg  font-bold cursor-default">
                  Les prochains trajets réservés
                </h5>
              </div>
              {nbNextBooking == 0 ? (
                <div className="flex h-[250px] items-center justify-center">
                  <h4 className="sm:text-3xl xs:text-xl">Vous n'avez aucune réservation en cours</h4>
                </div>
              ) : (
                <div className="flex h-80 justify-center gap-20 items-center mx-36">
                  {listNextBooking
                    .map((c, index) => (
                      <div key={c.id} className="">
                        <CardTravelProfile
                          user={user}
                          index={index}
                          driver={false}
                        />
                      </div>
                    ))
                    .reverse()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex sm:flex-row xs:flex-col xs:items-center xs:mt-5 sm:mt-0 justify-center item-center pb-10">
          {isUser && (
            <>
              <Button
                onClick={() => navigate(URL_SEARCH_LIST)}
                label={"Effectuer une réservation"}
                className={"bg-secondary font-bold "}
              ></Button>
              {hasRole === "USER_DRIVER" && (
                <Button
                  onClick={() => navigate(URL_CREATE_TRAVEL)}
                  label={"Programmer un trajet"}
                  className={
                    "text-dark font-bold ml-4 border-solid border-4 border-dark"
                  }
                ></Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextTravels;
