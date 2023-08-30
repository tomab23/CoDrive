import React, { useEffect, useState } from "react";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";
import { car, travelRegister } from "../../api/backend/account";
import publication from "../../assets/pictures/Create_travel/publication.svg";
import StepOne from "./TravelStep/StepOne";
import StepTwo from "./TravelStep/StepTwo";
import StepTree from "./TravelStep/StepTree";
import StepFour from "./TravelStep/StepFour";
import StepFive from "./TravelStep/StepFive";
import StepSix from "./TravelStep/StepSix";
import StepSeven from "./TravelStep/StepSeven";
import StepOptional from "./TravelStep/StepOptional";
import Confirmation from "./TravelStep/Confirmation";
import { URL_BACK_TRAVEL } from './../../constants/urls/urlBackEnd';

export const CreateTravel = () => {

  const [data, setData] = useState({
    cityStart: "",
    cityEnd: "",
    streetStart: "",
    streetEnd: "",
    zipStart: "",
    zipEnd: "",
    dateStarting: "",
    placeAvailable: 0,
    bigBaggageNbr: 0,
    smallBaggageNbr: 0,
    hour: "",
    music: false,
    smoking: false,
    discuss: false,
    car: null,
    km: 0,
    arrivedTime: "00:00:00",
    price: 0,
  })
  const [cameFromStepOptional, setCameFromStepOptional] = useState(false);

  const handleCreateCar = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep(8);
  };

  const handleConfig = () => {
    setCurrentStep(7);
  };

  const handleReturn = () => {
    setCameFromStepOptional(true);
    setCurrentStep(6)
  }


  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      const values = { ...data, ...newData };
      handleSubmited(values);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const [cars, setCars] = useState();

  useEffect(() => {
    car()
      .then((res) => {
        setCars(res.data);
      })
    .catch(() => setErrorMessage);
}, []);

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [isShow, setIsShow] = useState(false);
  
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo  prev={handlePrevStep} next={handleNextStep} data={data} />,
    <StepTree  prev={handlePrevStep} next={handleNextStep} data={data} />,
    <StepFour  prev={handlePrevStep} next={handleNextStep} data={data} />,
    <StepFive  prev={handlePrevStep} next={handleNextStep} data={data} />,
    <StepSix   prev={handlePrevStep} next={handleNextStep} data={data} />,
    <StepSeven   prev={handlePrevStep} next={handleCreateCar} data={data} onClick={handleConfig} cars={cars}  cameFromStepOptional={cameFromStepOptional}
    />,
    <StepOptional  prev={handlePrevStep} next={handleReturn} data={data} />,
    <Confirmation prev={handleReturn} next={handleNextStep} data={data} errorMessage={errorMessage} isError={isError} IsShow={isShow}/>,
  ];

  const handleSubmited = (values) => {
    travelRegister(values)
    .then((res) => {
        setIsError(true);
        setIsShow(true);
         console.log(res);
      })
      .catch(async (error) => { 
        setIsError(false);
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMessage('La ressource demandée est introuvable (erreur 404).');
          } else if (error.response.status === 403) {
            setErrorMessage('Accès interdit à la ressource (erreur 403).');
          } else {
            setErrorMessage("Erreur de réponse du serveur : " + error.response.status);
          }
        } else if (error.request) {
          setErrorMessage('Pas de réponse du serveur.');
        } else {
          setErrorMessage("Une erreur inattendue s'est produite : " + error.message);
        }
        setIsShow(true);
      });
  };
 
  return (
    <>
      <div>
        <Navbar />
      </div>
      <h6 className="mt-10 ml-20 font-bold">Publiez un trajet</h6>
      <div className="inset-0 flex items-center flex-col justify-center z-50">
        <div className="mx-auto">
          <>{steps[currentStep]}</>
        </div>
        <img src={publication} className="mt-40"></img>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
