import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import { useSelector } from "react-redux";
import { selectHasRole, selectUser } from "../../redux-store/authenticationSlice";
import PartProfile from "../../components/NewProfile/Profil/PartProfile";
import { getActifChoice, profile } from "../../api/backend/account";
import Notice from "../../components/Dashboard/Notice/Notice";
import UserWithoutCar from "../../components/NewProfile/infoCar/UserWithoutCar";
import DriverWithoutCar from "../../components/NewProfile/infoCar/DriverWithoutCar";
import { useParams } from "react-router";
import apiBackEndUser from "../../api/backend/api.BackendUser";
import TrueCardDetailsOverall from "../../components/Dashboard/Car/TrueCardDetailOverall";
import RealCarDetail from "../../components/itinerary/RealCarDetail";
import NextTravels from "../../components/NewProfile/Profil/NextTravels";
import carPicture from "../../assets/pictures/Create_travel/voiture3.svg";
import InfoCar from "../../components/NewProfile/infoCar/InfoCar";
import ReturnButton from "../../components/ReturnButton";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from 'react-router-dom';

const NewProfileUser = ({ isUser }) => {
  const location = useLocation();
  const params = useParams();
  const hasRole = useSelector((state) => selectHasRole(state));

  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);

  const [nbNextTravels, setNbNextTravels] = useState();
  const [listNextTravel, setListNexTravel] = useState([]);
  const [nbNextBooking, setNbNextBooking] = useState();
  const [listNextBooking, setListNextBooking] = useState([]);

  const [car, setCar] = useState([]);
  const [isLoadingCar, setIsLoadingCar] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isUser) {
          const res = await profile();
          setUser(res.data);
          setComments(res.data.listCommentaries);
          setCar(res.data.car[res.data.car.length - 1]);
          setNbNextTravels(res.data.listNextTwoTravels.length);
          setListNexTravel(res.data.listNextTwoTravels);
          setNbNextBooking(res.data.listNextTwoBookings.length);
          setListNextBooking(res.data.listNextTwoBookings);
        } else {
          const res = await apiBackEndUser.get(`/find/${Number(params.id)}`);
          setUser(res.data);
          setComments(res.data.listCommentaries);
          setCar(res.data.car[res.data.car.length - 1]);
          setNbNextTravels(res.data.listNextTwoTravels.length);
          setListNexTravel(res.data.listNextTwoTravels);
          setNbNextBooking(res.data.listNextTwoBookings.length);
          setListNextBooking(res.data.listNextTwoBookings);
        }
        setIsLoadingCar(false);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        setIsLoadingCar(false);
      }
    };
    fetchData();
  }, [isUser, params.id]);


  return (
    <div>
      <Navbar />

      {window.innerWidth > 500 &&
            <div className="mt-5">
            <ReturnButton className={"xl:ml-20 sm:ml-10"} />
          </div>
      }

      {!isUser && !user.actif ? (
        <>
          {loading ? (
            <div className="flex justify-center mt-10">
              <ClipLoader
                color="#000"
                // #92E3A9  #23645A
                loading={true}
                size={50}
              />
            </div>
          ) : (
            <div className="text-center font-bold mt-10">
              <h5>L'utilisateur à désactivé son compte</h5>
            </div>
          )}
        </>
      ) : (
        <>
        {loading ? (
                      <div className="flex justify-center mt-10">
                      <ClipLoader
                        color="#000"
                        // #92E3A9  #23645A
                        loading={true}
                        size={50}
                      />
                    </div>
        ) : (
           <>
           {/*Titre mon tableau de bord*/}
           {isUser ? (
             <div className="sm:mt-5 xs:mt-10 mb-5 font-bold xl:ml-20 sm:ml-10 xs:ml-6 flex gap-20 items-center">
               <h4 className="">
                 Mon <span className="bg-primary p-1">tableau de bord</span>
               </h4>
               {!user.actif &&
               <>
               {!loading &&
               <h6 className="font-bold text-hover">Votre compte est actuellement désactivé</h6>
               }
               </>
               }
             </div>
           ) : (
             <h4 className="sm:mt-5 xs:mt-10 mb-5 font-bold xl:ml-20 sm:ml-10 xs:ml-6">
               Profile de{" "}
               <span className="bg-primary p-1">
                 {" "}
                 {user.firstname} {user.lastname}
               </span>
             </h4>
           )}
 
           <div className="">
             <div className=" pb-10 ">
               <PartProfile user={user} note={user.note} isUser={isUser} />
             </div>
             <NextTravels
               listNextBooking={listNextBooking}
               listNextTravel={listNextTravel}
               nbNextTravels={nbNextTravels}
               nbNextBooking={nbNextBooking}
               user={user}
               isUser={isUser}
               hasRole={hasRole}
             />
             {isUser ? (
               <div>
                 {hasRole === "USER" ? (
                   <UserWithoutCar />
                 ) : (
                   <>
                     {car === undefined ? (
                       <div>
                         <DriverWithoutCar />
                       </div>
                     ) : (
                       <div>
                         <h4 className="xl:ml-20 sm:ml-10 xs:ml-6 mt-10 mb-10 font-bold">
                           Détails du{" "}
                           <span className="bg-primary p-1">véhicule</span>
                         </h4>
                         <div className="xl:ml-20">
                           <TrueCardDetailsOverall
                             car={car.id}
                             component={<RealCarDetail car={car} />}
                           />
                         </div>
                       </div>
                     )}
                   </>
                 )}
               </div>
             ) : (
               <div>
                 <>
                   {car === undefined ? (
                     <div>
                       <div className="flex flex-col justify-center items-center gap-10 p-10">
                         <h5 className="font-semibold">
                           Cette utilisateur n'a pas encore renseigné de véhicule
                         </h5>
                         <img
                           src={carPicture}
                           className="h-96 w-[70%]"
                           alt="image d'une voiture"
                         />
                       </div>
                     </div>
                   ) : (
                     <div>
                       <h4 className="ml-20 mt-10 font-bold">
                         Détails du{" "}
                         <span className="bg-primary p-1">véhicule</span>
                       </h4>
                       <TrueCardDetailsOverall
                         car={car.id}
                         component={<RealCarDetail car={car} />}
                       />
                     </div>
                   )}
                 </>
               </div>
             )}
             <div>
               <Notice user={user} comments={comments} />
             </div>
           </div>
 
           <div className="-mt-20">
             <Footer />
           </div>
         </>
        )}
        </>
      )}
    </div>
  );
};

export default NewProfileUser;
