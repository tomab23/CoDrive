import React, { useState, useEffect } from "react";
import { getImageProfile } from "../../../api/backend/account";
import avatar from "../../../assets/pictures/avatar.jpg"


const ImageProfile = () => {
  
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

  return (

    <div className="w-44 h-39 my-10">
      <img
        src={profile || avatar} 
        alt="User Profile"
        className="rounded-[10px]"
      />
    </div>
  );
};

export default ImageProfile;