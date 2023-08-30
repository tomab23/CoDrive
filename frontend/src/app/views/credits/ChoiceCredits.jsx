import React from "react";
import Navbar from "../../components/layouts/Navbar";
import ImageCredits from "../../components/credits/ImageCredits";
import Wallet from "../../components/itinerary/itineraryDetail/Wallet";
import { useLocation, useNavigate } from "react-router-dom";
import {
  URL_CONFIRM_BUY_CREDITS,
  URL_CONFIRM_SELL_CREDITS,
  URL_OFFER_CREDIT,
} from "../../constants/urls/urlFrontEnd";
import Button from "./../../components/Custom/Button";
import Footer from "../../components/layouts/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonBackCredits from "../../components/credits/ButtonBackCredits";
import TooltipPassword from "../../components/login-register/PopUpRegister/TooltipPassword";
import { InformationCircleIcon } from "@heroicons/react/solid";

const ChoiceCredits = ({ buy }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const ValidSchema = Yup.object().shape({
    points: Yup.number()
      .integer("Le montant ne dois pas comporter de virgule")
      .min(10, "🚗 Vous ne pouvez pas mettre moins de 10 crédit")
      .max(
        buy ? 1000 : location.state.credits,
        "🚗 Vous ne pouvez pas mettre autant de crédits d'un coup"
      )
      .required("🚗 Le nombre de crédits est obligatoire"),
  });

  console.log(location);

  const formik = useFormik({
    initialValues: {
      points: location.state?.value ? location.state.value : 10,
    },
    validationSchema: ValidSchema,
    onSubmit: (value) => {
      {
        buy
          ? navigate(URL_CONFIRM_BUY_CREDITS, {
              state: {
                credits: location.state.credits,
                value: value,
                travel: location.state.travel,
                payement: payement,
              },
            })
          : navigate(URL_CONFIRM_SELL_CREDITS, {
              state: {
                credits: location.state.credits,
                value: value,
                travel: location.state.travel,
                payement: payement,
              },
            });
      }
    },
  });

  const goOffer = () => {
    navigate(URL_OFFER_CREDIT, {
      state: { travel: location.state.travel },
    });
  };

  // 1 point = 0.1e
  const payement = formik.values.points * 0.1;
  const paymentView = (formik.values.points * 0.1).toFixed(2);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Navbar />

        <h4 className="font-bold ml-20 mt-10">
          {buy ? "Acheter des crédits" : "Vendre des crédits"}
        </h4>

        <h5 className="font-bold text-center mt-10 sm:text-2xl xs:text-xl">
          Saisissez le nombre de{" "}
          <span className="bg-primary p-1">
            crédits {buy ? "désirés" : "à vendre"}
          </span>
        </h5>

        {buy && (
          <div className="mt-10 text-center">
            <h6
              className="font-bold text-blue-700 underline cursor-pointer"
              onClick={goOffer}
            >
              <i>Nos offres spéciales</i>
            </h6>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 my-20">
          <div className="-mb-10">
            <Wallet />
          </div>
          <small className="absolute mb-28 text-sm font-semibold italic text-red-500">
            {formik.touched.points && formik.errors.points}
          </small>
          <input
            id="points"
            name="points"
            type="number"
            className="bg-input rounded w-24 h-8 font-bold"
            max={!buy ? location.state.credits : undefined}
            min={10}
            step={10}
            value={formik.values.points}
            onChange={formik.handleChange}
          />
          <div className="absolute ml-28">
            <TooltipPassword password={false}>
              <InformationCircleIcon className="h-5 w-5 ml-5 absolute " />
            </TooltipPassword>
          </div>
        </div>

        <div className="text-center">
          <p className="font-semiBold">
            Conversion en euro(s):{" "}
            <span className="ml-1 font-bold">{paymentView}</span> €
          </p>
        </div>

        <div className=" flex justify-center mt-20
        sm:text-base sm:gap-10 
        xs:gap-3 xs:text-sm ">

          {location.state?.travel !== undefined ? (
            <Button
              label="Revenir au trajet"
              className="py-1 border-2 border-dark text-dark bg-input ml-10"
              onClick={() =>
                navigate(`/itinerary-detail/${location.state.travel}`)
              }
            />
          ) : (
            <ButtonBackCredits points={location.state} />
          )}
                    <Button
            type="submit"
            label={buy ? "Pousuivre mon achat" : "Pousuivre ma vente"}
            className="bg-secondary"
          />
        </div>
      </form>
      <ImageCredits />
      <Footer />
    </div>
  );
};

export default ChoiceCredits;
