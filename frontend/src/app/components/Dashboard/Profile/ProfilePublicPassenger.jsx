import React from "react";
import Navbar from "../../layouts/Navbar"
import InfoPublic from "../InfoPublic";
import Notice from "../Notice/Notice"
import Footer from "../../layouts/Footer";

const ProfilePublicPassenger = () => {
  return (
    <div className="ProfilePublicDriverView">
      <Navbar></Navbar>
      <InfoPublic></InfoPublic>
      <Notice className={"top-[900px]"}></Notice>     
      <div className="absolute top-[1550px] w-full">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ProfilePublicPassenger;
