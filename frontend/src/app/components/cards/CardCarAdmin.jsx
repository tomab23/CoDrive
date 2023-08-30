import React, { useEffect, useState } from "react";
import suzuki1 from "../../assets/pictures/profile/suzuki1.jpg";
import suzuki2 from "../../assets/pictures/profile/suzuki2.jpg";
import suzuki3 from "../../assets/pictures/profile/suzuki3.jpg";
import { getImage } from "../../api/backend/account";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


const CardCarAdmin = ({ car }) => {
  const [option, setOption] = useState(false);

  const OpenOption = () => {
    alert("option a voir");
    setOption(false);
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const [imageList, setImageList] = useState();

  useEffect(() => {
    if (car.id !== null && car.id !== undefined) {
      getImage(car.id)
        .then((res) => {
          setImageList(res.data);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [car.id]);
  return (
    <div className=" h-[350px] w-[700px] bg-gray-200 rounded-lg p-5 flex shadow-xl">
      {/* <div className="h-[350px] w-[800px] bg-gray-200 rounded-lg p-5 flex shadow-xl"> */}
      {/* Images car */}
      <div className="grid grid-cols-2 gap-5">
        {imageList &&
          imageList.map((image) => (
            <div key={image.id} className="bg-black h-[90px] w-36 hover:scale-150">
              <img src={image.image} alt="image de la voiture" className="h-full w-full" />
            </div>
          ))}
      </div>
      {/* Infos car */}
      <div className="w-[300px] p-5">
        {/* <div className="w-[400px] p-5"> */}
        <div className="flex justify-start">
          <p className="bg-primary p-1">Informations : </p>
        </div>
        <div className="mt-5 flex flex-col justify-center gap-3">
          <p>
            <b>{car.brand}</b>
          </p>
          {car.door ? (
            <p>
              <b>5</b> portes
            </p>
          ) : (
            <p>
              <b>3</b> portes
            </p>
          )}
          {car.airConditioner ? (
            <p>
              Véhicule <b>climatisé</b>
            </p>
          ) : (
            <p>
              Véhicule <b>non climatisé</b>
            </p>
          )}
          <p>
            Le véhicule est de couleur <b>{car.color.color}</b>
          </p>
          {car.chest ? (
            <p>
              Le véhicule <b>comporte un coffre pour bagage</b>
            </p>
          ) : (
            <p>
              Le véhicule <b>ne comporte pas de coffre pour bagage</b>
            </p>
          )}
        </div>
      </div>
      <div className="w-10 flex justify-end items-star">
        <h5
          className="font-bold cursor-pointer"
          onClick={() => setOption(!option)}
        >
          ...
        </h5>
      </div>
      {option ? (
        <>
          {
            <button
              type="button"
              className="absolute ml-[590px] mt-[30px] bg-primary text-lg font-bold rounded-lg py-1 px-3"
              onClick={OpenOption}
            >
              Option
            </button>
          }
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardCarAdmin;
