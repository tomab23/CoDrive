import React, { useEffect, useState } from "react";
import avatar from "../../../assets/pictures/avatar.jpg";
import { profile } from "../../../api/backend/account";
import Stars from "../../Stars";
import { DateDetail } from "../../../helpers/DateDetail";

const Profile = ({ colSpan, className }) => {
  // pour la props colSpan, il faut utiliser "col-span-3"
  const [user, setUser] = useState(null);

  useEffect(() => {
    profile().then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="Profile">
      <div className="grid grid-cols-4 gap-2">
        {user ? (
          <div className={colSpan}>
            <div className="grid grid-cols-5 gap-1">
              {/*avatar sur 3 ligne et 1 colonne*/}
              <img
                src={avatar}
                alt="avatar"
                className="h-36 rounded-[10px] row-span-3"
              />

              {/*Nom utilisateur 1 colonne 1 ligne*/}
              <h4 className={`${className} mt-3 font-bold`}>
                {user.firstname} {user.lastname}
              </h4>

              {/*Avis 3 colonnes et 1 ligne*/}
              <h5
                className={`col-span-3 font-bold text-dark mt-4 ${className}`}
              >
                {/*nombre d'étoiles*/}
                <div className="flex justify-start ml-5">
                  <div className="mt-1 mr-2">
                    <Stars color={{ color: "#23645A" }} note={user.note} />
                  </div>
                  {user.note}/5 ({user.commentNumber} avis)
                </div>
              </h5>

              {/*date d'adhésion 3 colonnes 1 ligne*/}
              <h5 className={`${className} col-start-2 col-span-3`}>
                Membre depuis le{" "}
                <span className="font-bold">
                  {" "}
                  {DateDetail(user.creationDate)}{" "}
                </span>
              </h5>

              {/*nb trajet 4 colonnes 1 ligne*/}
              <h5 className={`${className} col-start-2 col-span-4`}>
                <span className="font-bold">{user.travelNumber} trajets</span>{" "}
                effectués
              </h5>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
