import React, { useState, useEffect } from "react";
import ProfileDriver from "../../components/Dashboard/Profile/ProfileDriver";
import ProfilePassenger from "../../components/Dashboard/Profile/ProfilePassenger";
import { profile } from "../../api/backend/account";

const ProfileView = () => {
  const [isDriver, setIsDriver] = useState(true);

  useEffect(() => {
    profile()
      .then((res) => {
        setIsDriver(res.data.driver);
      })
      .catch(() => setErrorLog(true));
  }, []);

  return (
    <div>
      {isDriver ? (
        <ProfileDriver></ProfileDriver>
      ) : (
        <ProfilePassenger></ProfilePassenger>
      )}
    </div>
  );
};

export default ProfileView;
