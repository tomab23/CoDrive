import React, { useState } from "react";
import Profile from "../../components/Dashboard/Profile/profile"
import banSmoking from "../../assets/pictures/profile/ban-smoking.svg";
import comments from "../../assets/pictures/profile/comments.svg";
import music from "../../assets/pictures/profile/music.svg";
import contacter from "../../assets/pictures/profile/contacter.svg";

const InfoPublic = () => {
  const [showChangeBio, setShowChangeBio] = useState(false);

  return (
    <div>
      {/*Titre mon tableau de bord*/}
      <h4 className="mt-16 mb-14 font-bold ml-20">
        Mon <span className="bg-primary">tableau de bord</span>
      </h4>
      {/*secion 1 mon tableau de bord*/}
      <div className="grid grid-cols-2 gap-2 ml-20 w-[900px]">
        {/*section description du tableau de bord*/}
        <div class="col-span-3">
          <Profile colSpan={"col-span-5"} className={"ml-5"}></Profile>
          <div class="grid grid-cols-5 gap-1">
            {/*option profile 1 colonne 1 ligne*/}
            <div className="bg-primary rounded-[10px] w-36 mt-6 absolute">
              <div class="flex justify-between items-center px-4 py-2">
                <img src={banSmoking} alt="banSmoking" className="h-6"></img>
                <img src={comments} alt="comment" className="h-6"></img>
                <img src={music} alt="music" className="h-6"></img>
              </div>
            </div>

            {/*titre bio*/}
            <div className="flex justify-start col-span-4 mt-7 absolute left-[280px]">
              <h4 className="font-bold">
                Votre <span className="bg-primary">bio</span>
              </h4>
            </div>

            {/*Détails bio*/}
            <div className="row-span-5 col-start-2 col-span-4 p-4 mr-20 mt-[100px]">
              <h5>
                Bonjour, <br></br>
                Je m’appelle Lucie et suis une vraie baroudeuse. Pour mon
                travail ou juste pour voyager, j’emprunte beaucoup ma voiture et
                la préservation de notre environnement est très importante pour
                moi. Autant allier l’utile à l’agréable et sociabiliser durant
                mes trajets.
                <br></br>Au plaisir de covoiturer ensemble !
              </h5>
            </div>
            {showChangeBio && (
              <h6 className="text-black opacity-50 row-span-5 col-span-4 col-start-2 absolute top-[780px] left-[290px]">
                300 caractères maximum
              </h6>
            )}
            {/*Section pour contacter la personne*/}
            <div class="text-right text-dark font-bold absolute right-20 top-[380px]">
                <span className="font-bold text-dark text-[26px]">Contacter</span>
                <img src={contacter} className="mt-8 ml-10 cursor-pointer" onClick={()=>alert("message envoyé")}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPublic;
