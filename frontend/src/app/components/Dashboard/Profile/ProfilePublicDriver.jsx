import React from "react";
import Navbar from "../../layouts/Navbar";
import InfoPublic from "../InfoPublic";
import Notice from "../Notice/Notice";
import Footer from "../../layouts/Footer";
import CarDetailsFeatures from "../Car/CarDetailsFeatures";

import demivoiture from "../../../assets/pictures/profile/demivoiture.png";

const ProfilePublicDriver = () => {
  return (
    <div className="ProfilePublicDriverView">
      <Navbar></Navbar>
      <InfoPublic></InfoPublic>
      <Notice className={"top-[900px]"}></Notice>
      <div className="mt-[930px]">
        <h3 className="ml-20 font-bold">
          Détails du <span className="bg-primary">véhicule</span>
        </h3>        
      </div>
      <div className="absolute top-[1800px]">
          
              <CarDetailsFeatures img={demivoiture}></CarDetailsFeatures>
            
        </div>
        <div className="absolute top-[2150px] w-full">      
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ProfilePublicDriver
;
