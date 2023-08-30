import React from "react";
import { useSelector } from "react-redux";
import { selectHasRole } from "../../../redux-store/authenticationSlice";

const TextAccount = ({ suppr, user }) => {

  const hasRole = useSelector((state) => selectHasRole(state));

  return (
    <div>
      {suppr && (
        <h6 className="xs:w-[300px] sm:w-[700px]">
          Attention,{" "}
          <span className="font-bold">
            la suppression de votre compte est un acte définitif.{" "}
          </span>
          Cela entraîne la perte de vos avis et de vos crédits sur CoDrive.{" "}
          <span className="font-bold">
            Un retour en arrière ne sera pas possible.{" "}
          </span><br /><br />
          <span className="font-bold">Assurez vous d’avoir vendu vos crédits</span> avant de confirmer la suppression
        de votre compte CoDrive.
        </h6>
 
        

      )}

      {!suppr && user.actif && (
        <h6 className="xs:w-[400px] sm:w-[700px] xs:text-center sm:text-left">
          Pas de problème. La désactivation{" "}
          <span className="font-bold">
            n’entraîne pas la suppression définitive{" "}
          </span>
          de votre compte CoDrive. Votre profil ne pourra plus être consulté par
          les autres utilisateurs, et pourra être{" "}
          <span className="font-bold">
            de nouveau activé à tout moment par vos soins.{" "}
          </span>
        </h6>
      )}

      {!suppr && !user.actif && (
        <h6 className="w-[780px]">
          <span className="font-bold">En réactivant votre compte</span>, votre
          profil pourra de nouveau être consulté par les autres utilisateurs.
          Vous pourrez de nouveau{" "}
          <span className="font-bold">faire des réservations</span>
          {hasRole === "USER_DRIVER" ? (
            <span className="font-bold"> ou programmer des trajets.</span>
          ) : (
            <span>.</span>
          )}
        </h6>
      )}
    </div>
  );
};

export default TextAccount;
