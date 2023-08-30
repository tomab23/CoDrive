import React, { useState, useEffect } from "react";
import avatar from "../../../assets/pictures/avatar.jpg";
import { Rating, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router";
import { dateWithoutDetailDay } from "../../../helpers/DateWithoutDetailDay";
import { getImageProfileById } from "../../../api/backend/account";

const ItineraryProfile = ({ user, className, nav }) => {
  const navigate = useNavigate();

  const profileUser = () => {
    if (nav) {
      navigate(`/profile/${user.userTravel_id}`);
    }
  };

  // {GESTION DES IMAGES}
  const [profile, setProfile] = useState();
  const userId = user.userTravel_id;
  //RECUPERE IMAGE PROFILE
  useEffect(() => {
    if (nav) {getImageProfileById(userId)
      .then((res) => {
        setProfile(res.data.image);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });}
      else {
      getImageProfileById(user.id)
      .then((res) => {
        setProfile(res.data.image);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
    }
  }, [userId || user.id]);

  return (
    <div className={`${className} mt-5 flex`}>
      <div className="flex xs:px-2">
        {/* AVATAR */}
        <img
          src={profile ? profile : avatar}
          alt="avatar"
          className={
            nav
              ? "sm:h-32 xs:h-24 xs:mt-14 sm:mt-0 rounded-[10px] border border-dark row-span-3 cursor-pointer"
              : "sm:h-32 xs:h-24 xs:mt-10 sm:mt-0 rounded-[10px] border border-dark row-span-3"
          }
          onClick={profileUser}
        />
        {/* USER INFORMATIONS */}
        <div className="flex flex-col gap-2 sm:ml-10 xs:ml-5">
          {/* NAME & NOTE */}
          <div className="flex sm:flex-row xs:flex-wrap">
            <h5 className="mt-3 font-bold">
              {user.firstname} {user.lastname}
            </h5>
            {/* STARS & NOTE & COMMENTS */}
            <h6 className="col-span-3 font-bold text-dark mt-4">
              {/*nombre d'étoiles*/}
              <div className="flex justify-start xl:ml-5">
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    className="mr-5"
                    value={Number(user.note)}
                    precision={0.5}
                    style={{ color: "#23645A" }}
                    emptyIcon={<StarIcon style={{ color: "#47634F35" }} />}
                    readOnly
                  />
                </Stack>
                {user.note} /5 ({user.commentNumber} avis)
              </div>
            </h6>
          </div>
          {/* MEMBER SINCE */}
          <h6 className="col-start-2 col-span-3">
            Membre depuis le{" "}
            <span className="font-bold">
              {dateWithoutDetailDay(user.creationDate)}
            </span>
          </h6>
          {/* TRAVELS NUMBER */}
          {user.countTravel === "" && (
            <h6 className="col-start-2 col-span-4">
              <span className="font-bold">Aucun trajet</span> effectué
            </h6>
          )}
          {user.countTravel > 1 ? (
            <h6 className="col-start-2 col-span-4">
              <span className="font-bold">{user.countTravel} trajets</span>{" "}
              effectués
            </h6>
          ) : (
            <h6 className="col-start-2 col-span-4">
              <span className="font-bold">{user.countTravel} trajet</span>{" "}
              effectué
            </h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryProfile;
