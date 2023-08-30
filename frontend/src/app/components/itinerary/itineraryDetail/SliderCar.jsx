
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import suzuki1 from "../../../assets/pictures/profile/suzuki1.jpg";
import suzuki2 from "../../../assets/pictures/profile/suzuki2.jpg";
import suzuki3 from "../../../assets/pictures/profile/suzuki3.jpg";

import "./car.css";
import { getImage } from "../../../api/backend/account";

const SliderCar = ({ carId }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageList, setImageList] = useState();

  useEffect(() => {
    if (carId !== null) {
      getImage(carId)
        .then((res) => {
          setImageList(res.data);
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
              <img src={image.image} alt="image de la voiture" />
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
        className="mySwiper cursor-pointer"
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

export default SliderCar;