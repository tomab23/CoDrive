import React from "react";
import avatar from "../../../assets/pictures/avatar.jpg";
import { DateDetail } from "../../../helpers/DateDetail";
import { Rating, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const InfoUserProfile = ({ user, className, note }) => {

  return (
    <div className={`${className} mt-10 mb-20 flex`}>
      <div className="flex">
        {/* AVATAR */}
        <img
          src={avatar}
          alt="avatar"
          className="h-32 rounded-[10px] row-span-3 cursor-not-allowed"
        />
        {/* USER INFORMATIONS */}
        <div className="flex flex-col gap-2 ml-10">
          {/* NAME & NOTE */}
          <div className="flex">
            <h5 className="mt-3 font-bold">
              {user.firstname} {user.lastname}
            </h5>
            {/* STARS & NOTE & COMMENTS */}
            <h6 className="col-span-3 font-bold text-dark mt-4">
              {/*nombre d'étoiles*/}
              <div className="flex justify-start ml-5">
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    className="mr-5"
                    value={Number(note)}
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
            <span className="font-bold">{DateDetail(user.creationDate)}</span>
          </h6>
          {/* TRAVELS NUMBER */}
          <h6 className="col-start-2 col-span-4">
            <span className="font-bold">{user.travelNumber} trajets</span>{" "}
            effectués
          </h6>
        </div>
      </div>
    </div>
  );
};

export default InfoUserProfile;
