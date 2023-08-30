import React, { useEffect, useState } from 'react'
import { getTravelsOfUser } from '../../../api/backend/account';
import CardTravelManagement from '../../cards/CardTravelManagement';
import { URL_CREATE_TRAVEL } from '../../../constants/urls/urlFrontEnd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectHasRole } from '../../../redux-store/authenticationSlice';

const ProgramTravelManagement = () => {

    const navigate = useNavigate();

    const hasRole = useSelector((state) => selectHasRole(state))

    // null, past, future
    const [date, setDate] = useState("future");

    const [future, setFuture] = useState(true);
    const [past, setPast] = useState(false);

    const [travels, setTravels] = useState([]);
    const [counTravels, setCountTravels] = useState();

  useEffect(() => {
    getTravelsOfUser(date).then((res) => {
        // console.log(res);
        setTravels(res.data);
        setCountTravels(res.data.length);

    });
  }, [date]);

  const travelPast = () => {
    setFuture(false);
    setPast(true);
    setDate("past");
  };

  const travelFuture = () => {
    setPast(false);
    setFuture(true);
    setDate("future");
  };

  console.log("program", travels);

  return (
    <div>
      <h5><span className="bg-primary p-1 font-bold">Vos trajets programmés</span></h5>

            {/* FILTER BUTTONS */}
            <div className="my-5 flex sm:flex-row xs:flex-wrap sm:gap-10 xs:gap-5 items-center">
        <button
          className={past ? "font-bold disabled cursor-default" : ""}
          onClick={travelPast}
        >
          Trajet passé
        </button>

        <button
          className={future ? "font-bold disabled cursor-default" : ""}
          onClick={travelFuture}
        >
          Trajet a venir
        </button>



        {past && (
          <>
            {counTravels > 1 ? (
              <p className="xl:ml-20 font-semibold">{counTravels} trajets passés</p>
            ) : (
              <p className="xl:ml-20 font-semibold">{counTravels} trajet passé</p>
            )}
          </>
        )}
        {future && (
          <>
            {counTravels > 1 ? (
              <p className="xl:ml-20 font-semibold">{counTravels} trajets a venir</p>
            ) : (
              <p className="xl:ml-20 font-semibold">{counTravels} trajet a venir</p>
            )}
          </>
        )}

        {window.innerWidth > 500 && hasRole === "USER_DRIVER" &&
                <button className='xl:ml-16 sm:ml-6 bg-secondary p-2 rounded-lg font-bold'
                onClick={() => navigate(URL_CREATE_TRAVEL)}
                >Programmer un nouveau trajet</button>
        }
      </div>

      <div className=" flex flex-col gap-5 items-start">
            {travels.map((travel) => (
              <CardTravelManagement key={travel.id} travel={travel} program={true} />
            ))}
                      {travels < 1 &&
          <h6 className="mt-5 font-semibold">Aucun trajet programmé</h6>
          }
          </div>
    </div>
  )
}

export default ProgramTravelManagement
