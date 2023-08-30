import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "./car.css";
import { getImage } from "../../../api/backend/account";

const TrueSliderCar = ({ carId }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageList, setImageList] = useState();

  useEffect(() => {
    if (carId !== null && carId !== undefined) {
      getImage(carId)
        .then((res) => {
          setImageList(res.data);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [carId]);

  return (
    <div className="my-10">
      {/* CAR PICTURE */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
        }}
        spaceBetween={10}
        loop={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded"
      >
        {imageList &&
          imageList.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                className="max-h-80"
                src={image.image}
                alt="image de la voiture"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* PICTURES BELOW  */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper cursor-pointer mt-3"
      >
        {imageList &&
          imageList.map((image) => (
            <SwiperSlide key={image.id}>
              <img src={image.image} alt="image de la voiture" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TrueSliderCar;
