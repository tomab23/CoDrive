import React from "react";
import { dateWithoutDetailDay } from "../../helpers/DateWithoutDetailDay";
import { useNavigate } from "react-router-dom";

const CardPassengerInfo = ({ passenger }) => {

    const navigate = useNavigate();
    
    const user = passenger.user;
    const booking = passenger.booking;

    const goProfile = () => {
        navigate(`/profile/${user.id}`);
    }

  return (
    <div className="flex items-center bg-gray-300 rounded-lg h-10 mr-20 my-5 pl-2 text-lg font-medium hover:bg-gray-200 cursor-pointer" onClick={goProfile}>
      <p>
        <span className="uppercase">{user.firstname} {user.lastname}</span> - {booking.place < 2 ? booking.place + " place prise" : booking.place + " places prises"} 
      </p>
    </div>
  );
};

export default CardPassengerInfo;
