import React, {  useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import Button from "../../components/Custom/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating, Stack } from "@mui/material";
import NoteItineraryCard from "../../components/itinerary/comment/NoteItineraryCard";
import { newCommentary } from "../../api/backend/account";
import avis from "../../assets/pictures/avis.svg";
import Footer from "../../components/layouts/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeToast from "../../components/CloseToast";
import ErrorNotify from "./../../components/notify/ErrorNotify";
import { URL_NEW_PROFILE, URL_PROFILE, URL_TRAVEL_MANAGEMENT } from "../../constants/urls/urlFrontEnd";
import { dateToday } from "../../helpers/DateToday";
import ReturnButton from "../../components/ReturnButton";
import { URL_GET_TRAVEL_CONNECT } from "../../constants/urls/urlBackEnd";

const NoteTravel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const travel = location.state.travel;

  console.log(travel);

  const [loading, setLoading] = useState(false);
  /**
   * For the Error message with toastify.
   */
  const toastId = React.useRef(null);

  const ValidSchema = Yup.object().shape({
    text: Yup.string()
      .min(5, "Il n'y à pas assez de caractères")
      .max(300, "Il y à trop de caractères")
      .required("Le nombre de place est obligatoire"),
    note: Yup.number()
      .required("La note est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      datePublication: dateToday(),
      note: null,
      text: "",
      anonymous: false,
      info: { id: travel.id },
    },
    validationSchema: ValidSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      handleSubmit(values, { resetForm });
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    newCommentary(values)
      .then(() => {
        navigate(URL_TRAVEL_MANAGEMENT);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.code);
        ErrorNotify(toastId);
        setLoading(false);
        resetForm();
      });
  };

  console.log(travel);

  return (
    <div>
      <Navbar />
      <h4 className="ml-20 mt-10 mb-5">Noter un trajet</h4>

      <ReturnButton className={"ml-20"} />

      {/* BODY */}
      <div className="flex flex-col items-center">
        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-start">
            <h5 className="font-bold mb-10">
              Qu’avez vous pensé de{" "}
              <span className="bg-primary p-1">votre covoiturage</span> avec{" "}
              {travel.user.firstname} {travel.user.lastname} ?{" "}
            </h5>

            <div className="self-center">
              <NoteItineraryCard travels={travel} />
            </div>

            <div className="flex items-center gap-4 my-16">
              <h6 className="font-bold">Notez votre hôte :</h6>
              <Stack spacing={1}>
                <Rating
                  className="mt-1"
                  name="note"
                  id="note"
                  precision={0.5}
                  value={Number(formik.values.note)}
                  size="large"
                  style={{ color: "#92E3A9" }}
                  onChange={formik.handleChange}
                />
              </Stack>
            </div>

            <h6 className="font-bold">Ajoutez un commentaire</h6>

            <textarea
              className="resize-none bg-input mt-5 self-center rounded-lg"
              name="text"
              id="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              cols="80"
              rows="8"
              placeholder="Tapez votre message ici."
              maxLength={300}
            ></textarea>
            <p className="text-xs mb-10 ml-12">
              300 caratères maximum. Merci de rester respectueux dans vos
              propos.
            </p>

{/* ANONYMOUS */}
            <div className="flex items-center self-center gap-3 mt-10 mb-20">
            <p className="font-bold">Je souhaite anonymiser mon avis </p>
            <input 
            type="checkbox" 
            name="anonymous"
            id="anonymous"
            checked={formik.values.anonymous}
            onChange={formik.handleChange}
            className="cursor-pointer rounded" />
            </div>

            <Button
              type="submit"
              label={!loading ? "soumettre mon avis" : "En cours..."}
              className="bg-secondary self-center"
              disabled={loading ? true : false}
            />
          </div>
          <ToastContainer
            position="top-center"
            style={{ width: "28rem", fontWeight: "bold", textAlign: "center" }}
            closeButton={closeToast}
            autoClose={10000}
          />
        </form>
        <img src={avis} alt="image" className="h-96 w-96 mt-20" />
      </div>

      <Footer />
    </div>
  );
};

export default NoteTravel;
