import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import ItinaryCard from "../../components/itinerary/ItineraryCard";
import mapPhone from "../../assets/pictures/itinerary/Trajet.svg";
import Footer from "../../components/layouts/Footer";
import * as Yup from "yup";
import { useFormik } from "formik";
import apiBackendSearch from "../../api/backend/api.BackendSearch";
import err from "../../assets/pictures/404.svg";

import FilterSearch from "../../components/itinerary/search/FilterSearch";
import InputsSearchView from "../../components/itinerary/search/InputsSearchView";
import ButtonValidateSearchVIew from "../../components/itinerary/search/ButtonValidateSearchVIew";
import AlertSearch from "../../components/itinerary/search/AlertSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeToast from "../../components/CloseToast";
import { useLocation } from "react-router-dom";
import { dateToday } from "../../helpers/DateToday";

const SearchListItinerary = () => {
  const location = useLocation();

  const [filter, setFilter] = useState(false);
  const [count, setCount] = useState(null);
  const [travels, setTravels] = useState([]);

  // console.log(" travel : ", travels);

  const [loading, setLoading] = useState(false);

  /**
   * Error message with toastify.
   */
  const toastId = React.useRef(null);
  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(
        "Une erreur est survenue, veuillez nous excuser",
        { theme: "colored", icon: "🚗" }
      );
    }
  };

  /**
   * Open and close filter
   */
  const filterView = () => {
    if (!filter) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

  const getData = (values) => {
    setLoading(true);
    setTravels([]);
    apiBackendSearch
      .get(
        `getTravel/${values.cityStart},${values.cityEnd},${values.dateStarting},${values.placeAvailable}`
      )
      .then((res) => {
        setLoading(false);
        setTravels(res.data.results);
        setCount(res.data.count);
        // console.log(res.data.results);
      })
      .catch((error) => {
        console.error("Erreur recupération des trajets", error.code);
        notify();
        setLoading(false);
      });
  };

  useEffect(() => {
    if (location.state != null) {
      getData(location.state);
    }
  }, []);

  const ValidSchema = Yup.object().shape({
    cityStart: Yup.string().required("La ville de départ est obligatoire"),
    cityEnd: Yup.string().required("La ville d'arrivée est obligatoire"),
    dateStarting: Yup.date().required("la date est obligatoire"),
    placeAvailable: Yup.string()
      .min(1, "Nombre de place trop courte")
      .max(6, "Nombre de place trop longue")
      .required("Le nombre de place est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      cityStart: location.state == null ? "" : location.state.cityStart,
      cityEnd: location.state == null ? "" : location.state.cityEnd,
      dateStarting:
        location.state == null ? dateToday() : location.state.dateStarting,
      placeAvailable:
        location.state == null ? 1 : location.state.placeAvailable,
    },
    // enableReinitialize: true,
    validationSchema: ValidSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("valeurs", values);
      getData(values);
      setSubmitting(false);
    },
  });

  return (
    <div>
      <Navbar />
      {/* TITLE */}
      <h4 className="font-bold xl:ml-20 sm:ml-10 xs:ml-6 my-16 sm:text-3xl xs:text-xl">
        {/* Ou ml-36 */}
        Résultats de <span className="bg-primary p-1">votre recherche</span>
      </h4>
      <div>
        {/* SEARCH ZONE */}
        <form onSubmit={formik.handleSubmit}>
          {/* INPUTS */}
          <InputsSearchView
            formik={formik}
            setFieldValue={formik.setFieldValue}
          />
          {/* FILTER */}
          <FilterSearch filter={filter} />
          {/* BUTTON */}
          <ButtonValidateSearchVIew filterView={filterView} loading={loading} />
          <ToastContainer
            position="top-center"
            style={{ width: "28rem", fontWeight: "bold" }}
            closeButton={closeToast}
            autoClose={10000}
          />
        </form>
      </div>
      {/* LIST ITINARY FOUND AND NOT FOUND */}
      <div>
        {count === null ? (
          <h4 className="my-10 font-bold xl:ml-40 sm:ml-10 xs:ml-6 xl:text-3xl sm:text-2xl xs:text-lg">
            {/* plutot ml-52 ou ml-60 ou 72 ?? */}disponible pour{" "}
            <span className="bg-primary p-1">
              {formik.values.cityStart} - {formik.values.cityEnd}
            </span>
          </h4>
        ) : (
          <h4 className="my-10 font-bold xl:ml-40 sm:ml-10 xs:ml-6 xl:text-3xl sm:text-2xl xs:text-lg">
            {/* plutot ml-52 ou ml-60 ou 72 ?? */}
            {count === 0
              ? `Aucun trajet disponible pour ${" "}`
              : `${count} trajet(s) disponible pour ${" "}`}
            <span className="bg-primary p-1">
              {formik.values.cityStart} - {formik.values.cityEnd}
            </span>
          </h4>
        )}

        {travels.length === 0 && count === 0 && (
          <div className="flex justify-center">
            <img
              src={err}
              alt="Image aucun trajet trouvé"
              className="sm:w-[500px] sm:h-[400px] xs:w-[300px] xs:h-[200px]"
            />
          </div>
        )}

        {travels.length === 0 && count === null && (
          <div className="flex justify-center h-40"></div>
        )}

        {travels.length > 0 && count > 0 && (
          <>
            {/* MAP LIST */}
            <div className="flex justify-evenly items-start  ">
              {/* ml-16 ? */}
              {/* <div className="flex gap-60 items-start"> */}
              <div className="flex flex-col items-center gap-5 ">
                {travels.map((travels) => (
                  <ItinaryCard
                    key={travels.id}
                    travels={travels}
                    search={formik.values}
                  />
                ))}
              </div>
              {/* ALERT */}
              {window.innerWidth > 1024 && (
                <div className="flex">
                  <img src={mapPhone} alt="image" className="w-[550px]" />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* MESSAGE / ALERT */}
      <AlertSearch />
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default SearchListItinerary;
