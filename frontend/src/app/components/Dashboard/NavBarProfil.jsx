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
import { CreateTravel } from './../../views/itinerary/CreateTravel';

const NavBarProfile = ({ closePopup, user }) => {

  const hasRole = useSelector((state) => selectHasRole(state));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(signOut());
    closePopup();
    navigate(URL_WELCOME)
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

  useEffect( async () => {
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
      state: {points : credits}  
    })
  } 

  const handleCreateTravel = () => {
    if (hasRole === "USER") {
      return;
    } else {
      navigate(URL_CREATE_TRAVEL);
    }
  }

  return (
    <div className="NavbarProfile -mt-16">
      {/*Photo de profil*/}
      <img
        src={ profile || avatar}
        alt="avatar"
        onClick={() => navigate(URL_NEW_PROFILE)}
        className="float-right mr-20  w-16 h-16 rounded-[10px] cursor-pointer"
      />

      {/* NOTIF AND ADMIN BUTTON */}
      <div className=" float-right mt-5 mr-20">
          <BellIcon className="h-7"></BellIcon>
      </div>

      {/*drawer pour la barre de navigation*/}
      <div className="drawer drawer-end h-16 w-1/2 absolute right-36">
        {/*Contrôle du drawer*/}
        <input id="drawer-profile" type="checkbox" className="drawer-toggle" />

        {/*Container du drawer (non ouvert)*/}
        <div className="drawer-content">
          {/*L'image de la flèche est le bouton qui permet d'ouvrir le drawer*/}
          <label htmlFor="drawer-profile" className="drawer-button">
            <div className="bg-secondary h-14 w-7 mt-1 rounded-l-[10px] cursor-pointer float-right right-56">
              <img
                src={fleche}
                alt="fleche"
                className="h-3.5 mt-[21px] ml-2"
              ></img>
            </div>
          </label>
        </div>

        {/*barre de navigation qui souvre sur le côté*/}
        <div className="drawer-side">
          {/*on cache l'overlay qui nous donne un aspect non désiré*/}
          <label
            htmlFor="drawer-profile"
            className="drawer-overlay hidden"
          ></label>

          <div className="bg-secondary h-14 mt-1 w-[650px] rounded-l-[10px] float-right right-56">
            <div className="flex justify-between items-center pt-1 px-6">
              {/*la flèche sera le bouton pour refermer la barre de navigation*/}
              <label htmlFor="drawer-profile" className="drawer-button">
                <img
                  src={fleche}
                  alt="fleche"
                  className="h-3.5 transform rotate-180 cursor-pointer"
                ></img>
              </label>

              <img
                src={rechercheTrajet}
                alt="rechercheTrajet"
                className="block h-12 cursor-pointer hover:opacity-0"
              ></img>
              <div
                onClick={() => navigate(URL_SEARCH_LIST)}
                className="cursor-pointer absolute opacity-0 top-0 right-[488px] bg-secondary hover:opacity-100"
              >
                <p className="flex justify-between items-center h-14 leading-tight text-center font-bold">
                  Chercher <br></br>un trajet
                </p>
              </div>

              <img
                src={ajoutTrajet}
                alt="ajoutTrajet"
                className="block h-12 cursor-pointer hover:opacity-0"
              ></img>
              <div
                onClick={handleCreateTravel}
                className={hasRole === "USER" ? 
                "cursor-not-allowed absolute opacity-0 top-0 right-[370px] bg-secondary hover:opacity-100" :
                "cursor-pointer absolute opacity-0 top-0 right-[370px] bg-secondary hover:opacity-100"}
                title={hasRole === "USER" ? "Vous devais avoir le permis pour créer un trajet" : undefined}
                
              >
                <p className={hasRole === "USER" ?
                "flex justify-between items-center h-14 leading-tight text-center text-gray-500 font-bold" :
                "flex justify-between items-center h-14 leading-tight text-center font-bold"}>
                  Ajouter <br></br>un trajet
                </p>
              </div>

              <img
                src={portefeuille}
                alt="portefeuille"
                className="block h-12 cursor-pointer hover:opacity-0"
              ></img>
              <div
                onClick={goCredits}
                className="cursor-pointer absolute opacity-0 top-0 right-[240px] bg-secondary hover:opacity-100"
              >
                <div className="flex justify-between items-center h-14  text-center">
                  <ul>
                    {!error ? (
                      <li className="text-[12px] font-bold">{credits} crédits</li>
                    ) : (
                      <li className="text-[12px] font-bold text-red-500">erreur</li>
                    )}
                    <li className="font-bold">Portefeuile</li>
                  </ul>
                </div>
              </div>

              <img
                src={messagerie}
                alt="messagerie"
                className="block h-12 cursor-pointer hover:opacity-0"
              ></img>
              <div
                onClick={() => navigate(URL_MESSAGE)}
                className="cursor-pointer absolute opacity-0 top-0 right-[125px] bg-secondary hover:opacity-100"
              >
                <p className="flex justify-between items-center h-14 leading-tight text-center font-bold">
                  Messagerie
                </p>
              </div>

              <img
                src={deconnexion}
                alt="deconnexion"
                className="block h-12 cursor-pointer hover:opacity-0"
              ></img>
              <div className="cursor-pointer absolute opacity-0 top-0 right-[3px] bg-secondary hover:opacity-100">
                <p
                  className="flex justify-between items-center h-14 font-bold"
                  onClick={logout}
                >
                  Déconnexion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarProfile;
