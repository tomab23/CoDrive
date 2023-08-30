import React from "react";
import {
  URL_ACCOUNT_DELETE,
  URL_ACCOUNT_DISABLE,
  URL_PASSWORD_CHANGE,
  URL_PROFILE_CHANGE,
  URL_TRANSACTION,
  URL_TRAVEL_MANAGEMENT,
} from "../../../constants/urls/urlFrontEnd";
import { useNavigate } from "react-router";

const MenuProfil = ({ user, location }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-dark font-bold flex flex-col right-20 gap-7 top-[350px]">
        <h6
          className="cursor-pointer hover:scale-105"
          onClick={() => navigate(URL_TRANSACTION)}
        >
          Voir mes transactions
        </h6>
        <h6
          className="  cursor-pointer hover:scale-105"
          onClick={() => navigate(URL_TRAVEL_MANAGEMENT)}
        >
          Voir mes trajets
        </h6>
        <h6
          className="cursor-pointer hover:scale-105"
          onClick={() => navigate(URL_PROFILE_CHANGE, { state: user })}
        >
          Modifier mon profil
        </h6>
        <h6
          className="cursor-pointer hover:scale-105"
          onClick={() => navigate(URL_PASSWORD_CHANGE)}
        >
          Modifier mon mot de passe
        </h6>
        {user.actif ? (
          <h6
            className=" cursor-pointer hover:scale-105"
            onClick={() => navigate(URL_ACCOUNT_DISABLE, { state: user })}
          >
            Désactiver mon compte
          </h6>
        ) : (
          <h6
            className=" cursor-pointer hover:scale-105"
            onClick={() => navigate(URL_ACCOUNT_DISABLE, { state: user })}
          >
            Activer mon compte
          </h6>
        )}
        <h6
          className="cursor-pointer hover:scale-105"
          onClick={() => navigate(URL_ACCOUNT_DELETE)}
        >
          Supprimer mon compte
        </h6>
      </div>
    </div>
  );
};

export default MenuProfil;
