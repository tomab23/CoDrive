import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parler from "../../../assets/pictures/profile/Parler.svg";
import music from "../../../assets/pictures/profile/Musique.svg";
import { DateDetail } from "../../../helpers/DateDetail";
import DetailTravel from "../../../components/itinerary/itineraryDetail/DetailTravel";
import Button from "../../../components/Custom/Button";
import RealCarDetail from "../../../components/itinerary/RealCarDetail";
import { getCar } from "../../../api/backend/account";
import { useFormik, Form, Formik } from "formik";
import TrueCardDetailsOverall from "../../../components/Dashboard/Car/TrueCardDetailOverall";
import ValidePopUp from "./ValidePopUp";
import { calculateArrivalTime } from '../../../helpers/calculateArrivalTime';


const Confirmation = (props) => {

  const { data, isError, errorMessage , IsShow } = props;

  const [isClicked, setIsClicked] = useState(false);

  const formik = useFormik({
    initialValues: {
      cityStart: props.data.cityStart,
      cityEnd: props.data.cityEnd,
      streetStart: props.data.streetStart,
      streetEnd: props.data.streetEnd,
      zipStart: props.data.zipStart,
      zipEnd: props.data.zipEnd,
      dateStarting: props.data.dateStarting,
      placeAvailable: props.data.placeAvailable,
      bigBaggageNbr: props.data.bigBaggageNbr,
      smallBaggageNbr: props.data.smallBaggageNbr,
      hour: props.data.hour,
      music: props.data.music,
      smoking: props.data.smoking,
      discuss: props.data.discuss,
      car: props.data.car,
      km: props.data.km,
      arrivedTime: props.data.arrivedTime,
      price: props.data.price,
    },
    onSubmit: (values) => {
      props.next(values, true);
    },
  });

  const navigate = useNavigate();

  const discuss = data.discuss;
  const musique = data.music;

  const { id } = data.car;
  const carId = Number(id);
  const [cars, setCars] = useState();

  useEffect(() => {
    const finalArrivedTime = calculateArrivalTime(props.data.hour, props.data.arrivedTime);
    data.arrivedTime = finalArrivedTime.slice(0, -3);
    formik.setFieldValue('arrivedTime', finalArrivedTime);
    const price = Math.floor(formik.values.km * 0.8);
    formik.setFieldValue('price', price);
  }, []);

  useEffect(() => {
    getCar(carId)
      .then((res) => {
        if (res) {
          setCars(res.data);
        }
      })
      .catch(() => setErrorMessage);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
  };
 
  return (
    <div>
      {/* PROFILE DETAILS */}
      <div className="flex items-center justify-center w-full">
        <h6 className="my-16 font-bold">
          <span className="bg-primary p-1">Récapitulatif</span> de votre trajet du {DateDetail(data.dateStarting)}
        </h6>
      </div>
      {/* RESUME ITNINERARY */}
      <div className="flex flex-col items-center justify-center gap-6 mb-6 mt-20">
        <DetailTravel
          hour={data.hour}
          streetStart={data.streetStart}
          zipStart={data.zipStart}
          cityStart={data.cityStart}
          streetEnd={data.streetEnd}
          zipEnd={data.zipEnd}
          cityEnd={data.cityEnd}
          place={data.place}
          timeTravel={data.km}
          timeArrive={data.arrivedTime}
          walletView={false}
        />
        <span className="font-bold">{data.bigBaggageNbr} gros bagage, {data.smallBaggageNbr} petit bagague</span>
      </div>
      <div>
        <div className="flex items-center justify-center gap-6 mb-6 mt-20">
          <div className="inline-flex flex-col items-center w-80 mb-3">
            <img src={parler} className="w-full h-60"></img>
            {discuss === true && <span >
              Je discute
            </span>}
            {discuss === false && <span
            >
              J'aime les trajets silencieux
            </span>}
          </div>
          <div className="inline-flex flex-col items-center w-80 mb-3">
            <img src={music} className="w-full h-60"></img>
            {musique === true && <span>
              J'écoute de la musique
            </span>}
            {musique === false && <span>
              Je n'en écoute pas
            </span>}
          </div>
        </div>
      </div>
      <div className="mt-20"><TrueCardDetailsOverall car={carId} component={<RealCarDetail car={cars} />} /></div>
      <Formik initialValues={data}>
        {() => (
          <Form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-center w-full">
          <Button
        type="submit"
        className="bg-secondary flex items-center justify-center"
        label={isClicked ? 'Création...' : 'Confirmer le trajet'}
        disabled={isClicked}
        onClick={handleClick}
        />
            {IsShow && formik.isValid && (
              <ValidePopUp IsShow={IsShow} isError={isError} errorMessage={errorMessage} />
            )}</div>
        </Form>
      )}
    </Formik>
  </div>
  );
};

export default Confirmation;