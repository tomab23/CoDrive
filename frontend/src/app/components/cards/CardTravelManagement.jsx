import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateWithoutDetailDay } from "./../../helpers/DateWithoutDetailDay";
import { setHourDate } from "../../helpers/setHourDate";
import NoteOneStar from "./../NoteOneStar";
import { HourFormat } from "../../helpers/HourCustom";
import { durationCalcule } from "./../../helpers/durationCalcule";
import { URL_NOTE_TRAVEL } from "../../constants/urls/urlFrontEnd";
import {
  getCommentInfoOfUSer,
  getNoteOfTravel,
} from "../../api/backend/account";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CardTravelManagement = ({ booking, travel, program }) => {
  const navigate = useNavigate();

  const info = program ? travel : booking?.booking.info;

  // Date now
  const time = new Date().getTime();
  // Date of travel
  const timeTravel = setHourDate(info.hour, info.dateStarting).getTime();

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [getNote, setGetNote] = useState();

  useEffect(() => {
    getCommentInfoOfUSer(info.id).then((res) => {
      setComments(res.data);
    });
    {
      program &&
        getNoteOfTravel(Number(info.id)).then((res) => {
          setGetNote(res.data);
        });
    }
  }, []);

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleCancel = () => {
    alert("annulée");
    setConfirmationOpen(false);
    // window.location.reload();
  };

  const endTime = info.itinerary.arrivedTime;
  const startTime = info.hour;
  const duration = durationCalcule(startTime, endTime);

  const infoDetails = () => {
    navigate(`/itinerary-detail/${info.id}`);
  };

  const notation = () => {
    navigate(URL_NOTE_TRAVEL, {
      state: {
        travel: info,
      },
    });
  };

  console.log(booking);

  return (
    <div
      // className={
      //   program
      //     ? "h-20 w-[750px] rounded-lg border border-black flex px-5 hover:shadow-sm hover:bg-hover-card"
      //     : "h-20 w-[820px] rounded-lg border border-black flex px-5 hover:shadow-sm hover:bg-hover-card"
      // }
      className={
        program
          ? "h-20 sm:min-w-[680px] rounded-lg border border-black flex sm:px-5 xs:px-2 hover:shadow-sm hover:bg-hover-card"
          : "h-20 sm:min-w-[700px] rounded-lg border border-black flex sm:px-5 xs:px-2 hover:shadow-sm hover:bg-hover-card"
      }
    >
      {/* DATE */}
      <div className="flex items-center justify-center gap-1 font-bold xs:mr-2 sm:mr-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        <p className="text-xs">{dateWithoutDetailDay(info.dateStarting)}</p>
      </div>

      {window.innerWidth > 500 && (
        <div className="border border-black h-10 self-center xl:mx-5 sm:mx-3"></div>
      )}

      {/* INFO */}
      <div className=" flex items-center text-sm font-semibold">
        {program ? (
          <div className="flex items-center sm:text-sm xs:text-xs font-semibold">
            <p className="font-bold">{info.itinerary.cityStart}</p>
            <p className="mx-1 font-semibold">{"->"}</p>
            <p className="font-bold">{info.itinerary.cityEnd}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex items-center sm:text-sm xs:text-xs font-semibold">
              <p className="font-bold">{info.itinerary.cityStart}</p>
              <p className="mx-1 font-semibold">{"->"}</p>
              <p className="font-bold">{info.itinerary.cityEnd}</p>
            </div>
            <p className="text-sm italic">réference : {booking.reference}</p>
          </div>
        )}

        {window.innerWidth > 500 && (
          <div className="border border-black h-10 self-center xl:mx-5 sm:mx-3"></div>
        )}

        {window.innerWidth > 1024 && (
          <>
            <div className=" flex flex-col justify-center">
              <p>
                Départ :{" "}
                <span className="font-bold">{HourFormat(info.hour)}</span>
              </p>
              <p>Durée : {duration}</p>
            </div>
          </>
        )}

        {window.innerWidth > 500 && window.innerWidth < 1024 && program && (
          <>
            <div className=" flex flex-col justify-center">
              <p>
                Départ :{" "}
                <span className="font-bold">{HourFormat(info.hour)}</span>
              </p>
              <p>Durée : {duration}</p>
            </div>
            <div className="border border-black h-10 self-center xl:mx-5 sm:mx-3"></div>
          </>
        )}
        {window.innerWidth > 500 && (
          <div className="xl:ml-5 flex flex-col justify-center">
            {program ? (
              <>
                <p>Distance: {info.itinerary.km} km</p>
                <p>Prix : {info.price} crédits</p>
              </>
            ) : (
              <>
                {booking.booking.place > 1 ? (
                  <p>Place prises : {booking.booking.place}</p>
                ) : (
                  <p>Place prise : {booking.booking.place}</p>
                )}
                <p>Crédits : {booking.booking.credits}</p>
              </>
            )}
          </div>
        )}
      </div>

      {window.innerWidth > 500 && (
        <div className="border border-black h-10 self-center xl:mx-5 sm:mx-3"></div>
      )}

      <div
        className="flex flex-col justify-center hover:underline font-semibold cursor-pointer xs:ml-2 sm:ml-0"
        onClick={infoDetails}
      >
        <p>Plus de</p>
        <p>détails</p>
      </div>

      {comments.length < 1 && !program && (
        <div className="border border-black h-10 self-center xl:mx-5 sm:mx-3 xs:mx-2"></div>
      )}

      {comments.length == 1 && !program && (
        <div className="border border-black h-10 self-center xl:mx-5 sm:mx-3 xs:mx-2"></div>
      )}

      {!program && (
        <div className="flex flex-col justify-center font-semibold">
          {comments.length < 1 && timeTravel > time && (
            <div className="cursor-default flex flex-col items-center">
              <p className="">A venir</p>
              <div className="mr-2">
                <NoteOneStar />
              </div>
            </div>
          )}
          {comments.length < 1 && timeTravel < time && (
            <div
              className="cursor-pointer hover:underline hover:scale-105"
              onClick={notation}
            >
              <p>Noter</p>
              <div className="ml-[3px]">
                <NoteOneStar />
              </div>
            </div>
          )}
          {comments.length == 1 && timeTravel < time && (
            <div className="flex justify-center items-center">
              <p className=" cursor-default text-dark text-xl">
                {comments[0].note}
              </p>
              <div className="">
                <NoteOneStar />
              </div>
            </div>
          )}
        </div>
      )}
      {program && timeTravel < time && (
        <>
          <div className="border border-black h-10 self-center mx-5"></div>

          {getNote >= 0.5 ? (
            <div className="flex justify-center items-center font-semibold">
              <p className=" cursor-default text-dark text-xl">{getNote}</p>
              <div className="">
                <NoteOneStar />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-sm font-semibold">
              <p>Aucune</p>
              <p>note</p>
            </div>
          )}
        </>
      )}

      {/* TODO: par la suite pouvoir annuler un trajet créé avant la date de départ ? */}
      {timeTravel > time && !program && (
        <>
          <div className="border border-black h-10 self-center mx-5"></div>

          <div
            className="flex flex-col items-center justify-center cursor-pointer hover:scale-110"
            onClick={handleOpenConfirmation}
          >
            <p className="font-bold text-red-600 text-sm">Annuler</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              color="red"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x-circle"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
        </>
      )}

      {!program && (
        <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
          <DialogTitle>
            Annulation de {info.itinerary.cityStart} - {info.itinerary.cityEnd}{" "}
            du {dateWithoutDetailDay(info.dateStarting)}
          </DialogTitle>
          <DialogContent sx={{ mx: 8, my: 2, p: 2 }}>
            <p>Voulez-vous vraiment annuler cette réservation ?</p>
            <br />
            <p className="text-sm text-center">
              remboursement aprés annulation : {booking.booking.credits} crédits
            </p>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 2 }}>
            <Button onClick={handleCloseConfirmation}>Non</Button>
            <Button style={{ color: "red" }} onClick={handleCancel}>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CardTravelManagement;
