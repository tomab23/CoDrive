import React, { useState } from "react";
import { DateFullMonth } from "../../../helpers/DateFullMonth";
import Stars from "../../Stars";
import { useSelector } from "react-redux";
import {
  selectHasRole,
  selectIsLogged,
} from "../../../redux-store/authenticationSlice";
import { useNavigate } from "react-router";
import { reportComment } from "../../../api/backend/account";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/base";
import apiBackEndAdmin from "../../../api/backend/apiBackendAdmin";

const CardNotice = ({
  img,
  name,
  dateNotice,
  notice,
  note,
  id,
  anonymous,
  user,
  infoId
}) => {

  // TODO: essayer de filtrer apres report sans recharger la page. filtrer la liste des commentaires

  const navigate = useNavigate();

  const hasRole = useSelector((state) => selectHasRole(state));
  const isLogged = useSelector(selectIsLogged);

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const goProfile = () => {
    navigate(`/profile/${user.id}`);
    window.location.reload();
  };

  const [reporting, setReporting] = useState(false);

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setReporting(!reporting);
  };

  const handleReport = () => {
    reportComment(id).catch((e) => console.log(e.code));
    // window.location.reload();
    setReporting(!reporting);
    setConfirmationOpen(false);
    
  };

  const archiveData = {
    text: notice,
    note: note,
    datePublication: dateNotice,
    infoId: infoId,
    userId: user.id,
    anonymous: anonymous,
    lastname: user.lastname,
    firstname: user.firstname,
  };

  // console.log("comment",user);

  const handleArchive = () => {
    apiBackEndAdmin
    .post('', archiveData).then(() => {
      apiBackEndAdmin.delete(`/delete/${id}`)
      .then(() => {
        window.location.reload();
        setReporting(!reporting);
        setConfirmationOpen(false);
      })
      .catch((e) => {
        console.log(e.code);
      })
    })
    .catch((e) => {
      console.log(e.code);
    })
  };

  return (
    <div className="card h-[370px] sm:w-[360px] xs:w-[300px] bg-base-100 mx-auto">
      <div className="card-body">
        {isLogged && (
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 text-dark right-4 top-0 absolute cursor-pointer"
            onClick={() => setReporting(!reporting)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            ></path>
          </svg>
        )}

        <div className="grid grid-cols-3 gap-2 absolute">
          {!anonymous && (
            <figure className="h-20 w-20 mt-1 grid col-span-1">
              <img
                src={img}
                alt="img"
                className={
                  hasRole === "ADMIN"
                    ? "rounded-[10px] cursor-pointer"
                    : "rounded-[10px]"
                }
                onClick={hasRole === "ADMIN" ? goProfile : undefined}
              />
            </figure>
          )}
          <div className="grid col-span-2 text-left ml-5">
            {!anonymous ? (
              <h5 className="mt-1 font-bold">{name}</h5>
            ) : (
              <h5 className="mt-1 font-bold">anonyme</h5>
            )}
            <h6 className="font-medium">{DateFullMonth(dateNotice)}</h6>
            <div className="flex justify-start items-center mt-1 -ml-3">
              <div className="ml-2">
                <Stars note={note} color={{ color: "#92E3A9" }} size="small" />
              </div>
            </div>
            
          </div>
          <div className="grid col-span-5 font-medium pr-5 mt-3">
            <div className="text-left text-lg">{notice}</div>
          </div>
        </div>
      </div>
      {reporting ? (
        <>
          {hasRole === "ADMIN" ? (
            <button
              type="button"
              className="absolute right-4 top-8 bg-gray-500 text-white text-lg font-bold rounded-lg mt-1 py-1 px-3"
              onClick={handleOpenConfirmation}
            >
              Archiver l'avis
            </button>
          ) : (
            <button
              type="button"
              className="absolute right-4 top-8 bg-primary text-lg font-bold rounded-lg mt-1 py-1 px-3"
              onClick={handleOpenConfirmation}
            >
              Signaler l'avis
            </button>
          )}
        </>
      ) : (
        ""
      )}
      {hasRole === "ADMIN" ? (
        <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
          <DialogTitle>Archiver</DialogTitle>
          <DialogContent sx={{ mx: 8, my: 2, p: 2 }}>
            <p>Archiver le commentaire ?</p>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 2 }}>
            <Button onClick={handleCloseConfirmation}>Non</Button>
            <Button style={{ color: "red" }} onClick={handleArchive}>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
          <DialogTitle>Signalement</DialogTitle>
          <DialogContent sx={{ mx: 8, my: 2, p: 2 }}>
            <p>Signaler le commentaire ?</p>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 2 }}>
            <Button onClick={handleCloseConfirmation}>Non</Button>
            <Button style={{ color: "red" }} onClick={handleReport}>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CardNotice;
