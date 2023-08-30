import React from "react";
import switchIcon from "../../../assets/pictures/icons/arrows-up-down.svg";
import start from "../../../assets/pictures/itinerary/icons/searchInput/StartCity.svg";
import end from "../../../assets/pictures/itinerary/icons/searchInput/EndCity.svg";
import { UserIcon } from "@heroicons/react/solid";
import { dateToday } from "../../../helpers/DateToday";

const InputsSearchView = ({ formik, setFieldValue }) => {

  const switchCity = () => {
    let start = document.getElementById("cityStart").value;
    let end = document.getElementById("cityEnd").value;
    setFieldValue("cityStart", end)
    setFieldValue("cityEnd", start)
  };

  return (
    <div>
      {/* INPUTS */}
      <div className="flex xl:flex-row xs:flex-wrap gap-5 justify-center font-bold">
        {/* START */}
        <div className="inline-flex items-center w-80">
          <input
            id="cityStart"
            name="cityStart"
            type="text"
            placeholder="Point de départ"
            className="w-80 rounded bg-input pl-10"
            onChange={formik.handleChange}
            value={formik.values.cityStart}
          />
          <div className="absolute ml-1  flex items-center pr-2">
            <img src={start} className="h-8 w-8 bg-input  p-2 relative z-40" />
          </div>
        </div>
        {/* SWITCH ICON */}
        <img
          src={switchIcon}
          alt=""
          className="h-8 w-8 sm:-mx-6 sm:mt-1.5 xs:mt-9 xs:ml-60 p-2 rounded cursor-pointer bg-primary xs:absolute sm:relative z-40 sm:rotate-90"
          onClick={switchCity}
        />
        {/* END */}
        <div className="inline-flex items-center w-80">
          <input
            id="cityEnd"
            name="cityEnd"
            type="text"
            placeholder="Point d'arrivée"
            className="w-80 rounded bg-input pl-10"
            onChange={formik.handleChange}
            value={formik.values.cityEnd}
          />
          <div className="absolute ml-1 flex items-center pr-2">
            <img src={end} className="h-8 w-8 bg-input  p-2 relative z-40" />
          </div>
        </div>
        {/* DATE */}
        <input
          name="dateStarting"
          type="date"
          className="rounded"
          onChange={formik.handleChange}
          value={formik.values.dateStarting}
          min={dateToday()}
        />
        {/* PLACE */}
        <div className="inline-flex items-center">
          <input
            name="placeAvailable"
            type="number"
            className="w-24 rounded pl-11"
            min={1}
            max={6}
            placeholder="0"
            onChange={formik.handleChange}
            value={formik.values.placeAvailable}
          />
          <div className="absolute ml-1 flex items-center pr-2">
            <UserIcon className="w-8 h-8 p-1 relative z-40 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputsSearchView;
