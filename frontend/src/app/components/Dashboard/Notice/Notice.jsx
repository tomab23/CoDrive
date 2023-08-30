import React from "react";
import CardNotice from "./CardNotice";
import avatar from "../../../assets/pictures/avatar.jpg";
import { URL_CONTACT_US } from "../../../constants/urls/urlFrontEnd";
import { useNavigate } from "react-router";

const Notice = ({className, user, comments}) => {

  console.log("com", user);

  return (
    <div>
      {comments.length === 0 ? (
             <div className={`${className} bg-primary h-40 w-full`}>
             <div className="flex">
               <h3 className="pt-12 xl:ml-20 sm:ml-10 xs:ml-6 font-bold xl:text-4xl sm:text-3xl xs:text-2xl ">Tous les avis reçus ({user?.commentNumber})</h3>
             </div>
             </div>
      ) : (
      <div className={`${className} bg-primary h-[680px] w-full`}>
      <div className="flex">
        <h3 className="pt-12 xl:ml-20 sm:ml-10 xs:ml-6 font-bold xl:text-4xl sm:text-3xl xs:text-2xl">Tous les avis reçus ({user?.commentNumber})</h3>
      </div>

      <div className="flex  mt-3 mr-6 overflow-auto scrollbar scrollbar-track-[#ECF3EE] scrollbar-thumb-dark">
        <div className="mt-20 pt-3 xs:mx-auto sm:mx-12 grid xl:grid-cols-3 xs:grid-cols-1 gap-8 w-full h-[400px]">

          {comments.map(com =>(
            <CardNotice
            key={com.id}
            img={avatar}
            name={com.user.firstname}
            dateNotice={com.datePublication}
            notice={com.text}
            note={com.note}
            id={com.id}
            anonymous={com.anonymous}
            user={com.user}
            infoId={com.info.id}
            />
          )).reverse()  
            }            
        </div>
      </div>
    </div>
      )}
      {/*Partie sur les avis*/}

    </div>
  );
};

export default Notice;
