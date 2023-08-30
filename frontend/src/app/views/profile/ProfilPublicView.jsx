import React, { useState } from "react";
import ProfilePublicDriver from "../../components/Dashboard/Profile/ProfilePublicDriver";
import ProfilePublicPassenger from"../../components/Dashboard/Profile/ProfilePublicPassenger"

const ProfilePublicView = () => {

    const [isDriver, setIsDriver] = useState(true);

    return(
    <div>
        {isDriver ? (
        <ProfilePublicDriver></ProfilePublicDriver>
      ) : (
        <ProfilePublicPassenger></ProfilePublicPassenger>
      )}
    </div>);
};

export default ProfilePublicView