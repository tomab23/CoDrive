import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectHasRole, selectIsLogged } from "./../../redux-store/authenticationSlice";
import { URL_ADMIN, URL_ADMIN_USER, URL_WELCOME } from "../../constants/urls/urlFrontEnd";
import codriveLogo from "../../assets/pictures/logo/codriveLogo.svg";
import LoginForm from "../login-register/PopUpLogin/LoginForm";
import PopUpRegister from "../login-register/PopUpRegister/PopUpRegister";
import { useLocation, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/solid";
import NavBarProfile from "../Dashboard/NavBarProfil";
import PopUpConfirmRegistre from "../login-register/PopUpRegister/PopUpConfirmRegister";
import ResetValid from "../login-register/PopUpLogin/ResetValid";
import ForgotPassword from "../login-register/PopUpLogin/ForgotPassword";
import { useEffect } from "react";
import { ROLE_ADMIN } from "../../constants/rolesConstant";
import CarPopUp from "../../views/itinerary/TravelStep/CarPopUp";
import NavbarMobile from "../Dashboard/NavbarMobile";

const Navbar = () => {
  const isLoggued = useSelector(selectIsLogged);
  const hasRole = useSelector((state) => selectHasRole(state));
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);

  const [isShowRegister, setIsShowRegister] = useState(false);
  const [isConfirmRegister, setIsConfirmRegister] = useState(false);

  /**
   * useState for forget password.
   */
  const [forgetPassword, setForgetPassword] = useState(false);
  const [resetValid, setResetValid] = useState(false);

  const handleLogin = () => {
    setIsShow(!isShow);
  };

  const handleForgetPassword = () => {
    setIsShow(false);
    setForgetPassword(!forgetPassword);
  };

  const handleResetPassword = () => {
    setForgetPassword(false);
    setResetValid(!resetValid);
  };

  const handleRegister = () => {
    setIsShowRegister(!isShowRegister);
  };

  const confirmationRegister = () => {
    setIsConfirmRegister(!isConfirmRegister);
  };

  /**
   * open register in the login
   */
  const openRegister = () => {
    setIsShow(false);
    setIsShowRegister(!isShowRegister);
  };

  const closePopup = () => {
    setIsShow(false);
    setIsShowRegister(false);
    setIsConfirmRegister(false);
    setForgetPassword(false);
    setResetValid(false);
  };

  return (
    <div>
      {/*barre du haut pour les informations ou promo*/}
      {isLoggued ? (
        <div className=""></div>
      ) : (
        <div className="flex h-12 items-center justify-center bg-primary text-center font-bold
        xl:text-2xl
        sm:text-sm 
        xs:text-xs xs:px-1">
          <StarIcon className="xl:h-4 xl:w-4 xl:mr-3
          sm:h-3 sm:w-3 sm:mr-2
          xs:h-0 xs:w-0 xs:mr-0" />
          Besoin d'un covoiturage ? Profitez de 50 crédits offerts dès votre
          inscription !
          <StarIcon className="xl:h-4 xl:w-4 xl:ml-3 
          sm:h-3 sm:w-3 sm:ml-2
          xs:h-0 xs:w-0 xs:ml-0" />
        </div>
      )}

{/* NAVBAR */}
      <div className="flow-root font-semibold xl:ml-14 sm:ml-10 xs:ml-6">
        {/* logo */}
        <img
          src={codriveLogo}
          alt="logo"
          onClick={() => navigate(URL_WELCOME)}
          className="cursor-pointer
          xl:h-16 xl:mt-12 
          lg:h-14 lg:mt-10 
          sm:h-12 sm:mt-8 
          xs:h-8 xs:mt-8 "
        />
        {isLoggued ? (
          <>
            {/* icone de profile avec sa navbar */}
         
            {window.innerWidth > 1100 ?
            <NavBarProfile closePopup={closePopup} /> : <NavbarMobile />}
          </>
        ) : (
          <>
            <p
              className="float-right text-dark cursor-pointer hover:text-hover xl:hover:border-l-8  border-hover
              xl:mr-14 xl:-mt-12 xl:pl-4 xl:text-2xl
              sm:mr-10 sm:-mt-10 sm:pl-0 sm:text-xl
              xs:mr-6 xs:-mt-6 xs:pl-0 xs:text-sm"
              onClick={handleLogin}
            >
              Se connecter
            </p>

            {/* pop up formulaire connexion */}
            {isShow ? (
              <div>
                <LoginForm
                  closePopup={closePopup}
                  openRegister={openRegister}
                  forgetPassword={handleForgetPassword}
                />
              </div>
            ) : (
              ""
            )}
            {forgetPassword ? (
              <div>
                <ForgotPassword
                  closePopup={closePopup}
                  resetPassword={handleResetPassword}
                />
              </div>
            ) : (
              ""
            )}
            {resetValid ? (
              <div>
                <ResetValid closePopup={closePopup} />
              </div>
            ) : (
              ""
            )}

            {/* lien pour s'inscrire */}
            <p
              className="float-right  text-dark cursor-pointer hover:text-hover xl:hover:border-l-8  border-hover
              xl:mr-64 xl:-mt-12 xl:pl-4 xl:text-2xl
              sm:mr-48 sm:-mt-10 sm:pl-4 sm:text-xl
              xs:mr-32 xs:-mt-6 xs:pl-4 xs:text-sm"
              
              onClick={handleRegister}
            >
              Créer un compte
            </p>
            {isShowRegister ? (
              <div>
                <PopUpRegister
                  closePopup={closePopup}
                  confirmationRegister={confirmationRegister}
                />
              </div>
            ) : (
              ""
            )}
            {isConfirmRegister ? (
              <div>
                <PopUpConfirmRegistre
                  closePopup={closePopup}
                  login={handleLogin}
                />
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      {/* ADMIN BUTTON */}
      {isLoggued && hasRole === ROLE_ADMIN && (
        <button
          className="float-right font-bold bg-secondary rounded 
          xl:mr-[86px] xl:mt-2
          sm:mr-[106px] sm:-mt-8 sm:py-1 sm:px-2.5
          xs:mr-[96px] xs:-mt-[30px] xs:py-0.5 xs:px-2 "
          onClick={() => navigate(URL_ADMIN_USER)}
        >
          ADMIN
        </button>
      )}    
      </div>
  );
};

export default Navbar;
