import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import {
  Navigation,
  Pagination,
  Grid,
} from "swiper";
import React, { useState, useEffect } from "react";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./style.css";
import CardCarrousel from "../itinerary/CardCarrousel";
import { test } from "../../api/backend/account";
import imageError from "../../assets/pictures/404.svg"
import HashLoader from "react-spinners/HashLoader";

const Sliders = () => {
  const [carrousels, setCarrousels] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);

  const [errMessage, setErrMessage] = useState("")

  useEffect(() => {
    setError(false)
    setLoading(true);
    test()
      .then((carrousel) => {
        setLoading(false);
        setCarrousels(carrousel.data);
      })
      .catch((e) => {
        console.log(e.code)
        if (e.code === "ERR_NETWORK") {
          setLoading(false)
          setError(true);
          setErrMessage("ERR_NETWORK")
        } else if (e.code === "ERR_BAD_REQUEST") {
          setLoading(false)
          setError(true);
          setErrMessage("ERR_BAD_REQUEST")
        }
      });
  }, []);

  return (
 <>
 {loading && 
  <div className=" flex justify-center items-center xl:ml-[45%] sm:ml-[40%] xs:ml-[35%]">
               <HashLoader
             color="#23645A"
             // #92E3A9  #23645A
             loading={true}
             size={150}
           />
  </div>
 }
 {!error ? (
     <Swiper
     slidesPerView={window.innerWidth >= 1280 ? 2 : 1}
     style={{
       "--swiper-navigation-color": "#263038",
       "--swiper-pagination-color": "#263038",
     }}
     grid={{
       rows: 2,
     }}
     navigation={{
       clickable: true,
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     }}
     pagination={{
       clickable: true,
     }}
     modules={[Grid, Pagination, Navigation]}
     className="mt-10 xs:mt-5 w-full"
   >
     {carrousels.map((carrousel) => (
       <SwiperSlide key={carrousel.id}>
         {" "}
         <CardCarrousel carrousel={carrousel} />
       </SwiperSlide>
     ))}

     <div className="swiper-button-prev text-9xl top-1/2 right-4 transform -translate-y-1/2 z-10 pr-5 font-black" />
     <div className="swiper-button-next text-9xl top-1/2 right-4 transform -translate-y-1/2 z-10 font-black " />
   </Swiper>
 ) : (
  <div className="mt-5">
    <p className="font-bold my-5">🚗 Une erreur est survenue, veuillez nous excuser 🚗</p>
    <p className="mb-10 text-sm text-center">code : {errMessage}</p>
    <img src={imageError} alt="" />
  </div>
 )}
 </>
  );
};

export default Sliders;
