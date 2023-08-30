import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Button from "../../components/Custom/Button";
import { DateDetail } from "../../helpers/DateDetail";
import DetailTravel from "../../components/itinerary/itineraryDetail/DetailTravel";
import {
  URL_BUY_CREDITS,
  URL_ERROR_404,
  URL_RESERVED_ITINERARY,
  URL_SEARCH_LIST,
} from "../../constants/urls/urlFrontEnd";
import Wallet from "../../components/itinerary/itineraryDetail/Wallet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserIcon } from "@heroicons/react/solid";
import apiBackendInfo from "./../../api/backend/api.BackendInfo";
import {
  getCredits,
  newTransaction,
  reservation,
  updatePoints,
} from "../../api/backend/account";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux-store/authenticationSlice";
import emailjs from "@emailjs/browser";
import { HourFormat } from "../../helpers/HourCustom";
import ReturnButton from "./../../components/ReturnButton";
import { dateToday } from "../../helpers/DateToday";

const ConfirmTravel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getMailUser = useSelector((state) => selectUser(state));

  const infoTravel = location.state.travel;
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    getCredits()
      .then((res) => setCredits(res.data))
      .catch((e) => console.log(e.code));
  }, []);

  const reserved = (value) => {
    navigate(URL_RESERVED_ITINERARY, {
      state: {
        travel: infoTravel,
        place: value,
        credits: priceOfTravel,
        duration: location.state.duration
      },
    });
  };

  const goSearchPage = () => {
    navigate(URL_SEARCH_LIST, {
      state: location.state.search,
    });
  };

  // Email parameters to contact us
  const yourServiceId = "service_5ktpcdd";
  const yourTemplateId = "template_r26bw3s";
  const yourPublicId = "TNZjyQl8IgfvcCn7i";
  /**
   * Function to send the email.
   * @param {*} values values of form contact
   */
  const sendMail = (values) => {
    emailjs
      .send(yourServiceId, yourTemplateId, values, yourPublicId)
      .then((result) => {
        console.log("result", result);
      })
      .catch((e) => console.log(e.code));
  };

  // Informations about the recap of reservation for the mail
  const mailUser = getMailUser.username;

  const update = (
    result,
    value,
    point,
    mailValue,
    bookingInfo,
    transaction
  ) => {
    reservation(bookingInfo)
      .then(() =>
        updatePoints(point)
          .then(() => {
            apiBackendInfo.put(`place/${infoTravel.id}`, result);
          })
          .then(() => reserved(value))
          .then(() => {
            sendMail(mailValue);
            newTransaction(transaction);
          })
          .catch((e) => {
            console.log(e);
            navigate(URL_ERROR_404);
          })
      )
      .catch((e) => console.log(e.code));
  };

  const ValidSchema = Yup.object().shape({
    placeAvailable: Yup.string()
      .min(1, "Nombre de place trop courte")
      .max(infoTravel.placeAvailable, "Nombre de place trop longue")
      .required("Le nombre de place est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      placeAvailable: 1,
    },
    validationSchema: ValidSchema,
    onSubmit: (value) => {
      const result = infoTravel.placeAvailable - formik.values.placeAvailable;
      const place = { placeAvailable: result };
      const pointTravel = infoTravel.price * formik.values.placeAvailable;
      const resultPoints = credits - pointTravel;
      const newPoints = { points: resultPoints };
      const mailValue = {
        reference: infoTravel.reference,
        dateStarting: DateDetail(infoTravel.dateStarting),
        mail: mailUser,
        hour: HourFormat(infoTravel.hour),
        start: infoTravel.itinerary.cityStart,
        end: infoTravel.itinerary.cityEnd,
        place: formik.values.placeAvailable,
        credits: pointTravel,
      };
      const bookingInfo = {
        info: { id: infoTravel.id },
        place: formik.values.placeAvailable,
        credits: infoTravel.price * formik.values.placeAvailable,
      };
      const transaction = {
        credits: pointTravel,
        payement: 0,
        buy: false,
        description: "Réservation",
        transactionalDate: dateToday(),
      };
      update(place, value, newPoints, mailValue, bookingInfo, transaction);
    },
  });

  const priceOfTravel = infoTravel.price * formik.values.placeAvailable;

  const goCredits = () => {
    navigate(URL_BUY_CREDITS, {
      state: { credits: credits, travel: infoTravel.id },
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Navbar />
        {/* PROFILE DETAILS */}
        <h4 className=" font-bold
        xl:ml-20 xl:text-3xl xl:mt-10 xl:mb-10
        sm:ml-10 sm:text-xl sm:mt-5 sm:mb-5
        xs:ml-2 xs:text-xl xs:mt-10 xs:mb-5">
          <span className="bg-primary p-1">Confirmez votre réservation</span>{" "}
          pour le {DateDetail(infoTravel.dateStarting)}
        </h4>
        {/* RETURN BUTTON */}
        {window.innerWidth > 500 &&
        <ReturnButton className={"xl:ml-20 sm:ml-10"} />
        }

        {/* RESUME ITNINERARY */}
        <div className="mt-10 mb-10 sm:ml-10 xl:ml-0 xs:px-5 sm:px-0">
          <DetailTravel
            hour={infoTravel.hour}
            streetStart={infoTravel.itinerary.streetStart}
            zipStart={infoTravel.itinerary.zipStart}
            cityStart={infoTravel.itinerary.cityStart}
            streetEnd={infoTravel.itinerary.streetEnd}
            zipEnd={infoTravel.itinerary.zipEnd}
            cityEnd={infoTravel.itinerary.cityEnd}
            placeView={true}
            place={infoTravel.placeAvailable}
            timeTravel={location.state.duration}
            timeArrive={infoTravel.itinerary.arrivedTime}
            walletView={false}
            km={infoTravel.itinerary.km}
          />
        </div>

        <div className="xl:my-20 sm:my-10 xs:my-10 flex justify-center items-center gap-2">
          <h6>Nombre de place à reserver : </h6>
          {/* <input type="number" min={1} max={Number(infoTravel.place)} defaultValue={1} /> */}
          <div className="inline-flex items-center">
            <input
              name="placeAvailable"
              type="number"
              className="w-24 rounded pl-11 font-bold"
              min={1}
              max={infoTravel.placeAvailable}
              placeholder="0"
              onChange={formik.handleChange}
              value={formik.values.placeAvailable}
            />
            <div className="absolute ml-1 flex items-center pr-2">
              <UserIcon className="w-8 h-8 p-1 relative z-40 text-black" />
            </div>
          </div>
        </div>

        {/* CREDITS */}
        <div className="flex flex-col items-center">
          <h4 className="font-bold mb-16 xl:text-3xl sm:text-2xl xs:text-lg">
            Nombre de{" "}
            <span className="bg-primary p-0.5">crédits à débourser</span> pour
            ce trajet
          </h4>
          <div className="flex">
            <Wallet />
            <div>
              <p className="mb-16 font-bold ml-4">{priceOfTravel} crédits</p>
            </div>
          </div>
          <p>
            Il reste <b>{credits} crédits</b> sur votre compte
          </p>
          {credits < priceOfTravel && (
            <div className="flex mt-8 gap-1">
              <span className="font-medium">
                Vous n'avez{" "}
                <span className="bg-primary p-1">pas assez de points.</span>
              </span>
              <span
                className="font-bold cursor-pointer underline"
                onClick={goCredits}
              >
                <i>Cliquer ici</i>
              </span>
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center 
        sm:flex-row sm:gap-10 sm:mt-16
        xs:flex-col xs:items-center xs:mt-10">
          <Button
            type="button"
            label="Revenir à la recherche"
            className="py-1 outline outline-2 outline-dark text-dark bg-input xs:w-[60%] sm:w-auto"
            onClick={goSearchPage}
          />
          {credits < priceOfTravel ? (
            <Button
              type="submit"
              label="Confirmer la réservation"
              className="bg-gray-400 outline outline-2 outline-gray-400 cursor-not-allowed"
              disabled={true}
              title={"Vous n'avez pas assez de points"}
            />
          ) : (
            <Button
              type="submit"
              label="Confirmer la réservation"
              className="bg-secondary outline outline-2 outline-secondary xs:w-[60%] sm:w-auto"
            />
          )}
        </div>

        <Footer />
      </form>
    </div>
  );
};

export default ConfirmTravel;
