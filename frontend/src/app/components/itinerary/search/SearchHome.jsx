import React from "react";
import Input from "../../Custom/Input";
import start from "../../../assets/pictures/itinerary/icons/searchInput/StartCity.svg";
import end from "../../../assets/pictures/itinerary/icons/searchInput/EndCity.svg";
import { UserIcon } from "@heroicons/react/solid";
import switchIcon from "../../../assets/pictures/icons/arrows-up-down.svg";
import Button from "../../Custom/Button";
import { dateToday } from "../../../helpers/DateToday";


const SearchHome = ({ formik, setFieldValue }) => {

  const switchCity = () => {
    let start = document.getElementById("cityStart").value;
    let end = document.getElementById("cityEnd").value;

    setFieldValue("cityStart", end)
    setFieldValue("cityEnd", start)
  };

  return (
    <div className="flex flex-col justify-center items-center 
    xl:mt-16 xl:gap-4
    sm:mt-12 sm:gap-5
    xs:mt-10 xs:gap-5">
      {/* START CITY */}
      <div className="inline-flex items-center w-80">
        <Input
          id="cityStart"
          name="cityStart"
          type="text"
          placeholder="Entrez votre point de départ"
          className="w-80 rounded bg-input pl-10 "
          onChange={formik.handleChange}
          value={formik.values.cityStart}
        />
        {/* ICON */}
        <div className="absolute flex items-center pr-2
        xl:ml-1 xl:mt-2
        sm:ml-1 sm:mt-1
        xs:ml-1 xs:mt-0">
          <img src={start} className="h-8 w-8 bg-input p-2 relative z-40" />
        </div>
      </div>
      {/* SWITCH ICON */}
      <img
        src={switchIcon}
        alt="icon pour inverser les villes"
        className="h-8 w-8 p-2 rounded cursor-pointer bg-primary relative z-40
        xl:-mt-5 xl:-mb-7 xl:ml-64
        xm:-mt-4 sm:-mb-7 sm:ml-64
        xs:-mt-7 xs:-mb-7 xs:ml-64"
        onClick={switchCity}
      />
      {/* END CITY */}
      <div className="inline-flex items-center w-80">
        <Input
          id="cityEnd"
          name="cityEnd"
          type="text"
          placeholder="Entrez votre point d'arrivée"
          className="w-80 rounded bg-input pl-10"
          onChange={formik.handleChange}
          value={formik.values.cityEnd}
        />
        {/* ICON */}
        <div className="absolute ml-1 mt-2 flex items-center pr-2
          xl:ml-1 xl:mt-2
          sm:ml-1 sm:mt-1
          xs:ml-1 xs:mt-0">
          <img
            src={end}
            alt=""
            className="h-8 w-8 p-2  bg-input relative z-40"
          />
        </div>
      </div>
      <div className="flex gap-4 xl:mb-5 sm:mb-3 xs:mb-2">
        {/* CALENDAR */}
        <div>
          <Input
            name="dateStarting"
            type="date"
            id="date"
            className="w-52 rounded bg-input"
            onChange={formik.handleChange}
            value={formik.values.dateStarting}
            min={dateToday()}
          />
        </div>
        {/* PLACE */}
        <div>
          <div className="inline-flex items-center">
            <Input
              name="placeAvailable"
              type="number"
              min={1}
              max={6}
              placeholder="0"
              className="w-24 rounded pl-11 bg-input"
              onChange={formik.handleChange}
              value={formik.values.placeAvailable}
            />
            <div className="absolute flex items-center pr-2
              xl:ml-1 xl:mt-2
              sm:ml-1 sm:mt-1
              xs:ml-1 xs:mt-0">
              <UserIcon className="w-8 h-8 p-1 relative z-40 text-black" />
            </div>
          </div>
        </div>
      </div>
      <Button
      type="submit"
        label="Rechercher"
        className="text-lg outline outline-2 bg-secondary outline-secondary"
      />
    </div>
  );
};

export default SearchHome;
