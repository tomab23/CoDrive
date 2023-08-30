import React, { useEffect, useState } from "react";
import avatar from "../../assets/pictures/avatar.jpg";
import rechercheTrajet from "../../assets/pictures/navbar/rechercheTrajet.svg";
import ajoutTrajet from "../../assets/pictures/navbar/ajoutTrajet.svg";
import portefeuille from "../../assets/pictures/navbar/portfeuille.svg";
import messagerie from "../../assets/pictures/navbar/messagerie.svg";
import deconnexion from "../../assets/pictures/navbar/deconnexion.svg";
import fleche from "../../assets/pictures/navbar/fleche.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectHasRole, signOut } from "../../redux-store/authenticationSlice";
import {
  URL_ADMIN,
  URL_CREATE_TRAVEL,
  URL_CREDITS,
  URL_ERROR_404,
  URL_MESSAGE,
  URL_NEW_PROFILE,
  URL_PROFILE,
  URL_SEARCH_LIST,
  URL_WELCOME,
} from "../../constants/urls/urlFrontEnd";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/solid";
import { ROLE_ADMIN } from "../../constants/rolesConstant";
import Button from "../Custom/Button";
import { getCredits, getImageProfile } from "../../api/backend/account";
import { CreateTravel } from "./../../views/itinerary/CreateTravel";

const NavbarMobile = () => {
  const hasRole = useSelector((state) => selectHasRole(state));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(signOut());
    closePopup();
    navigate(URL_WELCOME);
  };

  const [credits, setCredits] = useState();
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    getImageProfile()
      .then((res) => {
        setProfile(res.data.image);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }, []);

  useEffect(async () => {
    getCredits()
      .then((res) => {
        setCredits(res.data);
      })
      .catch((e) => {
        console.log("error = ", e.code);
        if (e.code === "ERR_NETWORK") {
          setError(true);
        }
      });
  }, []);

  const goCredits = () => {
    navigate(URL_CREDITS, {
      state: { points: credits },
    });
  };

  const handleCreateTravel = () => {
    if (hasRole === "USER") {
      return;
    } else {
      navigate(URL_CREATE_TRAVEL);
    }
  };

  return (
    <div>
      <div
        className="dropdown dropdown-bottom dropdown-end float-right 
      sm:-mt-8 
      xs:-mt-7 xs:mr-10"
      >
        <label tabIndex={0} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={window.innerWidth < 500 ? "24" : "32"}
            height={window.innerWidth < 500 ? "24" : "32"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box sm:w-56 xs:w-52"
        >
          <li className="mb-2">
            <a onClick={() => navigate(URL_NEW_PROFILE)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={window.innerWidth < 500 ? "16" : "20"}
                height={window.innerWidth < 500 ? "16" : "20"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-square-2"
              >
                <path d="M18 21a6 6 0 0 0-12 0" />
                <circle cx="12" cy="11" r="4" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
              </svg>
              Mon Profil
            </a>
          </li>
          <li>
            <a onClick={() => navigate(URL_SEARCH_LIST)}>
              <img
                src={rechercheTrajet}
                alt="rechercheTrajet"
                className="sm:h-5 xs:h-4"
              ></img>
              Chercher un trajet
            </a>
          </li>
    {hasRole === "USER_DRIVER" || hasRole === "ADMIN" &&
              <li>
              <a onClick={handleCreateTravel}>
                <img src={ajoutTrajet} alt="ajoutTrajet" className="sm:h-5 xs:h-4"></img>
                Ajouter un trajet
              </a>
            </li>
    }
          <li>
            <a onClick={goCredits}>
              <img src={portefeuille} alt="portefeuille" className="sm:h-5 xs:h-4"></img>
              Portefeuille <br /> {credits} crédits{" "}
            </a>
          </li>
          <li>
            <a onClick={() => navigate(URL_MESSAGE)}>
              <img src={messagerie} alt="messagerie" className="sm:h-5 xs:h-4"></img>
              Messagerie
            </a>
          </li>
          <li className="mt-4">
            <a onClick={logout}>
              <img
                src={deconnexion}
                alt="deconnexion"
                className="h-4 cursor-pointer"
              ></img>
              Déconnexion
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarMobile;
