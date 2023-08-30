import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  REGEX_EMAIL,
  REGEX_FIRSTNAME,
  REGEX_LASTNAME,
  REGEX_PASSWORD,
} from "../../../constants/regex";
import { newTransaction, register, transactionRegister } from "../../../api/backend/account";
import { useFormik } from "formik";
import Input from "../../Custom/Input";
import {
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeToast from "../../CloseToast";
import TooltipPassword from "./TooltipPassword";
import emailjs from "@emailjs/browser";
import { dateToday } from "../../../helpers/DateToday";

const PopUpRegister = ({ closePopup, confirmationRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorRec, setErrorRec] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputType(showPassword ? "text" : "password");
  }, [showPassword]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const ValidSchema = Yup.object().shape({
    lastname: Yup.string()
      .matches(REGEX_LASTNAME, "Caractère nom et prénom incorrect")
      .min(2, "Trop petit")
      .max(30, "trop long")
      .required("Ce champ est obligatoire"),
    firstname: Yup.string()
      .matches(REGEX_FIRSTNAME, "Caractère nom et prénom incorrect")
      .min(2, "Trop petit")
      .max(30, "trop long")
      .required("Ce champ est obligatoire"),
    dateOfBirth: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Vous devez avoir au moins 18 ans"
      )
      .transform((value, originalValue) => {
        const [year, month, day] = originalValue.split("-");
        return new Date(`${year}-${month}-${day}`);
      })
      .required("Date de naissance obligatoire"),
    mail: Yup.string()
      .matches(REGEX_EMAIL, "Le format du mail n est pas correct")
      .email("Le format du mail n'est pas correct")
      .required("L'email est obligatoire"),
    password: Yup.string()
      .matches(REGEX_PASSWORD, `Le mot de passe ne correspend pas`)
      .required("Mot de passe obligatoire"),
    confirmMdp: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Le mot de passe de confirmation ne correspond pas"
      )
      .required("La confirmation de mot de passe est obligatoire"),
    CGV: Yup.boolean().oneOf(
      [true],
      "Veuiller accepter les CGV et le réglement du site"
    ),
  });

    /**
   * Error back message with toastify.
   */
    const toastId = React.useRef(null);
    const notifyError = () => {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Une erreur est survenue, veuillez nous excuser",
          { theme: "colored", icon: "🚗" }
        );
      }
    };

        /**
   * Error back message with toastify.
   */
        const notifyRegister = () => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(
              "L'email indiqué est déjà lié à un compte",
              { theme: "colored", icon: "🚗" }
            );
          }
        };

  // Email parameters to contact us
  const yourServiceId = "service_nukqe31";
  const yourTemplateId = "template_c8qphpc";
  const yourPublicId = "vf5_j005PD0S1d1KO";
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
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmited = (values) => {
    register(values)
      .then((res) => { 
        if (res.status === 200 && res.data.token) {
          const transaction = {
            credits: 50,
            payement: 0,
            buy: true,
            description: "Offert à l'inscription",
            transactionalDate: dateToday(),
          };
          transactionRegister(transaction).catch("ERR TRANSACTION");
          closePopup();
          confirmationRegister();
          sendMail(values);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          setErrorRec(true);
          notifyRegister();
        } else {
          setErrorStatus(true);
          notifyError();
        }
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      dateOfBirth: "",
      mail: "",
      password: "",
      confirmMdp: "",
      isDriver: null,
      CGV: false,
    },
    onSubmit: (values) => {
      setLoading(true);
      setErrorRec(false);
      setErrorStatus(false);
      handleSubmited(values);
    },
    validationSchema: ValidSchema,
  });

  const handleDrive = (value) => {
    formik.setFieldValue("isDriver", value).catch((e) => console.log(e));
  };

  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center z-50">
      <div className=" bg-primary bg-opacity-95 p-2 rounded-[30px] flex flex-col w-full max-w-md">
        {/*  Icon pour fermer le pop Up Login */}
        <div className="flex justify-end ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="#92E3A9"
            className="w-5 h-5 rounded mt-5 mr-4 bg-gray-900 p-1 cursor-pointer"
            onClick={closePopup}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="mx-auto">
          {/* TITLE  */}
          <div className="mb-8">
            <p className="text-xl font-bold text-black text-center mb-5">
              Bienvenue sur CoDrive !
            </p>
            <p className="text-ml text-black text-center">
              Besoin de covoiturage ? Inscrivez-vous !{" "}
            </p>
            <p className="text-ml font-bold text-black text-center ">
              Tous les champs sont requis.{" "}
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <div className="relative flex ">
                <div className="inline-flex w-80 mb-3">
                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Nom"
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium  px-4 py-2  text-black border-none"
                    error={formik.touched.lastname && formik.errors.lastname}
                  />
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80 mb-3">
                  <Input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium  px-4 py-2  text-black border-none"
                    error={formik.touched.firstname && formik.errors.firstname}
                  />
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80 mb-3">
                  <Input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date de naissance"
                    min="1900-01-01"
                    max="2099-12-31"
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium  px-4 py-2  text-black border-none"
                    error={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                  />
                </div>
              </div>
              {/* EMAIL INPUT */}
              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80 mb-3">
                  <Input
                    type="email"
                    name="mail"
                    placeholder="Adresse email"
                    className="rounded-full w-full font-medium  px-4 py-2  text-black border-none"
                    onChange={formik.handleChange}
                    error={formik.touched.mail && formik.errors.mail}
                  />
                  {/* EMAIL ICON */}
                  <div className="absolute inset-y-0 px- right-0 flex items-center pr-2">
                    <MailIcon className="w-5 h-5 mr-2 text-black mb-3" />
                  </div>
                </div>
              </div>
              {/* PASSWORD INPUT */}
              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80 mb-3">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium px-4 py-2 border-none"
                    error={formik.touched.password && formik.errors.password}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-2 mb-3">
                    <button
                      type="button"
                      className="h-full p-2 text-gray-600 focus:outline-none "
                      onClick={handleShowPassword}
                    >
                      {/* PASSWORD ICON */}
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5  text-black" />
                      ) : (
                        <EyeIcon className="w-[1.25rem] h-[1.25rem] text-black" />
                      )}
                    </button>

                    <TooltipPassword password={true}>
                      <InformationCircleIcon className="h-5 w-5 sm:ml-5 xs:ml-3 absolute " />
                    </TooltipPassword>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80 mb-3">
                  {/* REPEAT PASSWORD INPUT */}
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmMdp"
                    placeholder="Mot de passe"
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium px-4 py-2 border-none"
                    error={
                      formik.touched.confirmMdp && formik.errors.confirmMdp
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-2 mb-3">
                    <button
                      type="button"
                      className="h-full p-2 text-gray-600 focus:outline-none "
                      onClick={handleShowPassword}
                    >
                      {/* PASSWORD ICON */}
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5  text-black" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-black" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* IS DRIVER CHOICE */}
              <div>
                <p className="font-bold text-black">Avez vous le permis B ?</p>
                <div className="flex justify-center gap-10 my-2 text-black font-bold">
                  <span
                    onClick={() => handleDrive(true)}
                    className={
                      formik.values.isDriver === true
                        ? "text-black cursor-pointer"
                        : "text-dark cursor-pointer"
                    }
                  >
                    Oui
                  </span>
                  <span
                    onClick={() => handleDrive(false)}
                    className={
                      formik.values.isDriver === false
                        ? "text-black cursor-pointer"
                        : "text-dark cursor-pointer"
                    }
                  >
                    Non
                  </span>
                </div>
              </div>
              {/* CGV CHECKBOX */}
              <div className="relative flex  ">
                <label>
                  <div className="inline-flex mr-2">
                    <Input
                      type="checkbox"
                      name="CGV"
                      className="rounded-full font-medium  px-2 py-2  text-black border-none"
                      onChange={formik.handleChange}
                    />
                  </div>
                  J'accepte les CGV et le réglement de CoDrive
                </label>

                <div className="text-red-500 text-xs absolute mt-5 ml-5">
                  {formik.touched.CGV && formik.errors.CGV}
                </div>
              </div>
            </div>
            {/* ERRORS MESSAGES */}
            {errorRec && (
              <small className="absolute ml-12 -mt-3 font-bold text-sm italic text-red-500">
                L'email indiqué est déjà lié à un compte
              </small>
            )}
            {errorStatus && (
              <small className="absolute ml-2 -mt-3 font-bold  text-sm italic text-red-500">
                🚨 Une erreur est survenue, veuillez nous excuser ! 🚗
              </small>
            )}
            {/* SUBSCRIPTION BUTTON */}
            {!loading ? (
              <div className="flex justify-center items-center mt-12 mb-6 ">
                <button
                  type="submit"
                  className="bg-secondary px-6 py-2 rounded-lg font-bold"
                >
                  inscription
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center mt-12 mb-6 ">
                <button
                  type="submit"
                  className="bg-secondary px-6 py-2 rounded-lg font-bold cursor-wait"
                  disabled
                >
                  inscription...
                </button>
              </div>
            )}
                      <ToastContainer
            position="top-center"
            style={{ width: "28rem", fontWeight: "bold", textAlign: "center" }}
            closeButton={closeToast}
            autoClose={10000}
          />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUpRegister;
