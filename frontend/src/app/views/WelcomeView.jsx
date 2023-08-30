import voiture from "../assets/pictures/accueil/voiture.svg";
import pieces from "../assets/pictures/accueil/pieces.svg";
import avis from "../assets/pictures/accueil/avis.svg";
import ecoresponsable from "../assets/pictures/accueil/ecoresponsable.svg";
import Footer from "../components/layouts/Footer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_ACCOUNT_DISABLE, URL_NEW_PROFILE, URL_OFFER_CREDIT, URL_SEARCH_LIST, URL_TRANSACTION } from "../constants/urls/urlFrontEnd";
import Navbar from "../components/layouts/Navbar";
import Sliders from "../components/Slider/Slider";
import { useSelector } from "react-redux";
import {
  selectIsLogged,
} from "../redux-store/authenticationSlice";
import { useFormik, Form, Formik } from "formik";
import * as Yup from "yup";
import SearchHome from "../components/itinerary/search/SearchHome";
import { dateToday } from "../helpers/DateToday";
import { StarIcon } from "@heroicons/react/solid";
import { getActifChoice, profile } from "../api/backend/account";


const WelcomeView = () => {
  const navigate = useNavigate();

  const isLogged = useSelector(selectIsLogged);
  // const hasRole = useSelector((state) => selectHasRole(state));

  const ValidSchema = Yup.object().shape({
    cityStart: Yup.string().required("Les villes sont obligatoires"),
    cityEnd: Yup.string().required("Les villes sont obligatoires"),
    dateStarting: Yup.date().required("la date est obligatoire"),
    placeAvailable: Yup.number()
      .min(1, "Nombre de place trop courte")
      .max(6, "Nombre de place trop longue")
      .required("Le nombre de place est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      cityStart: "",
      cityEnd: "",
      dateStarting: dateToday(),
      placeAvailable: 1,
    },
    validationSchema: ValidSchema,
    onSubmit: (values) => {
      navigate(URL_SEARCH_LIST, { state: values });
    },
  });


  const [actif, setActif] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if(isLogged) {
      getActifChoice().then((res) => {
        setError(false);
        setActif(res.data.actif)
      })
      .catch((e) => {
        console.log(e.code);
        setError(true);
      })
    }
  }, [isLogged])

  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

    useEffect(() => {
        profile()
            .then((res) => {
                setUserId(res.data.id);
                setUserName(res.data.firstname)
            })
            .catch(() => setErrorLog(true));
    }, []);

    return (
    <div className="WelcomeView">
      {isLogged && (
        <div className="flex h-12 items-center justify-center bg-primary text-center sm:text-xl xs:text-lg font-bold">
          <StarIcon className="h-4 w-4 mr-3" />
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate(URL_OFFER_CREDIT, {state: {home: true}})}
          >
            Besoin de crédits ? Découvrez nos offres !
          </span>
          <StarIcon className="h-4 w-4 ml-3" />
        </div>
      )}
         {/* {error && (
        <div className="flex h-12 items-center justify-center bg-primary text-center text-lg font-bold gap-2">
          🚗
          <span
          >
           Une erreur est survenue, veuillez nous excusez !
          </span>
          🚗
        </div>
      )} */}
      {/* {isLogged && !actif && (
        <div className="flex h-12 items-center justify-center bg-primary text-center text-xl font-bold">
          <StarIcon className="h-4 w-4 mr-3" />
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate(URL_NEW_PROFILE)}
          >
           Votre compte est désactiver, activer le !
          </span>
          <StarIcon className="h-4 w-4 ml-3" />
        </div>
      )} */}
      <Navbar />


      {/* SEARCH ITINERARY PART*/}
      <div className="grid
      xl:grid-cols-2 xl:gap-4 xl:mt-16
      sm:grid-cols-1 sm:gap-4 sm:mt-16
      xs:grid-cols-1 xs:gap-4 xs:mt-10">
        <h3 className="text-center font-bold px-8 xl:text-4xl sm:text-3xl xs:text-xl ">
          Covoiturez sereinement avec&nbsp;
          <span className="bg-primary xl:p-1 sm:p-1 xs:p-0.5">CoDrive</span>
          {/* ITINARY SEARCH */}
          <form onSubmit={formik.handleSubmit}>
            <SearchHome formik={formik} setFieldValue={formik.setFieldValue}/>
            <p className="text-red-500 text-sm mt-5">
              {(formik.touched.cityEnd && formik.errors.cityEnd) ||
                (formik.touched.cityStart && formik.errors.cityStart)}
            </p>
          </form>
        </h3>
        {/* image voiture */}
        <div className="xl:mr-20">
          <img src={voiture} alt="voiture" className="w-auto" />
        </div>
      </div>

      {/* LAST ITINERARY IN CAROUSEL */}
      <div className="bg-primary mt-24">
        <h3 className="font-bold 
        xl:text-4xl xl:ml-20 xl:pt-12
        sm:text-3xl sm:ml-10 sm:pt-10
        xs:text-xl xs:ml-6 xs:pt-8">
          Les derniers trajets proposés
        </h3>
        <div className="flex h-[500px] justify-center pb-16">
          <Sliders />
        </div>
      </div>

      {/* partie décrivant les objectifs de l'application */}
      <div className="xl:mt-32 xs:mt-20">
        <div className="grid justify-items-center">
          <div>
            <h3 className="font-bold xl:text-4xl sm:text-4xl xs:text-2xl">
              {" "}
              Pourquoi utiliser&nbsp;
              <span className="bg-primary p-1">nos services ?</span>
            </h3>
          </div>
          <div className="xl:w-1/2 sm:w-[60%] xs:w-[75%] mt-16 ">
            <h5 className="font-medium xl:text-2xl sm:text-2xl xs:text-xl">
              <span className="font-bold">
                Gagner des crédits en covoiturant, c’est voyager librement.{" "}
              </span>
              Avec CoDrive, votre portefeuille est virtuel.&nbsp;
              <span className="font-bold">20 km, c’est 20 crédits gagnés </span>
              et déboursables dans n’importe quel trajet. Vous n’avez pas de
              voiture ? Pas de souci, vous pouvez&nbsp;
              <span className="font-bold">
                acheter ces crédits et les utiliser{" "}
              </span>
              pour les trajets dont vous avez besoin.
            </h5>
          </div>
          {/* MORE INFORMATIONS */}
          <div className="grid xl:grid-cols-3 sm:grid-cols-1
          xl:mt-36 xl:mx-20 xl:gap-8 
          sm:mt-28 sm:mx-20 sm:gap-20 
          xs:mt-28 xs:mx-20 xs:gap-20">
            <div>
              <img src={pieces} alt="pieces" className="w-72 h-72 mx-auto" />
              <h4 className="font-bold text-center xl:mt-28 sm:mt-2 xs:mt-2">
                Un portefeuille paisible
              </h4>
              <h6 className="font-medium xm:mt-12 sm:mt-6 xs:mt-6">
                En convertissant le prix d’un trajet par celui des crédits de
                votre portefeuille virtuel, vous pouvez{" "}
                <span className="font-bold">économiser</span> sur vos trajets
                réguliers.
              </h6>
            </div>
            <div>
              <img src={avis} alt="avis" className="w-72 h-72 mx-auto" />
              <h4 className="font-bold text-center xl:mt-28 sm:mt-2 xs:mt-2">Des avis vérifiés</h4>
              <h6 className="font-medium xm:mt-12 sm:mt-6 xs:mt-6">
                CoDrive est un excellent moyen de socialiser avec{" "}
                <span className="font-bold">des personnes de confiance</span>,
                dont les avis sont vérifiés automatiquement.
              </h6>
            </div>
            <div className="xs:-mb-32 sm:-mb-28">
              <img
                src={ecoresponsable}
                alt="ecoresponsable"
                className="w-72 h-72 mx-auto"
              />
              <h4 className="font-bold text-center xl:mt-28 sm:mt-2 xs:mt-2">
                Un environnement préservé
              </h4>
              <h6 className="font-medium xm:mt-12 sm:mt-6 xs:mt-6">
                Le covoiturage permet de réduire le nombre de voitures sur la
                route, ce qui peut{" "}
                <span className="font-bold">
                  réduire les émissions de gaz à effet de serre
                </span>
                .
              </h6>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomeView;
