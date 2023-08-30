import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Custom/Input";
import { MailIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { signIn } from "../../../redux-store/authenticationSlice";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../api/backend/account";
import Button from "../../Custom/Button";

const LoginForm = ({ closePopup, openRegister, forgetPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const [loading, setLoading] = useState(false);

  const [errorLog, setErrorLog] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    setLoading(true);
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          dispatch(signIn(res.data.token)).then(closePopup);
          setLoading(false);
        }
      })
      .catch((error) => {
        let raison = { ...error.response };
        if (raison.status === 403) {
          setErrorLog(true);
        } else {
          setErrorStatus(true);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setInputType(showPassword ? "text" : "password");
  }, [showPassword]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const ValidSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Trop petit")
      .max(50, "Trop long !")
      .required("Mot de passe obligatoire"),
    mail: Yup.string()
      .email("Adresse email invalide")
      .required("Adresse email obligatoire"),
  });

  const formikk = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    onSubmit: (values) => {
      setErrorLog(false);
      setErrorStatus(false);
      handleLogin(values);
    },
    validationSchema: ValidSchema,
  });

  return (
    <div className="fixed sm:mt-0 xs:mt-10 inset-0 flex items-center flex-col justify-center z-50">
      <div className="bg-primary bg-opacity-95 p-2 rounded-t-[30px] flex flex-col w-full max-w-md">
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
          {/* Titre  */}
          <p className="text-4xl font-bold text-black mb-6  text-center">
            {" "}
            Connectez-vous
          </p>
          {/* Formulaire de connexion */}
          <form onSubmit={formikk.handleSubmit}>
            <div className="flex justify-center flex-col gap-3 mb-4">
              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80 mb-2">
                  {/* Input de l'adresse mail */}
                  <Input
                    type="email"
                    name="mail"
                    placeholder="Adresse email"
                    value={formikk.values.mail}
                    onChange={formikk.handleChange}
                    className="rounded-full w-full font-medium  px-4 py-2  text-black border-none"
                    error={formikk.touched.mail && formikk.errors.mail}
                  />
                  <div className="absolute inset-y-0 px- right-0 flex items-center pr-2">
                    {/* Icone Mail */}
                    <MailIcon className="w-5 h-5 mr-2 text-black mb-2" />
                  </div>
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="inline-flex items-center w-80">
                  {/* Input pour le mot de passe */}
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    onChange={formikk.handleChange}
                    className="rounded-full w-full font-medium px-4 py-2 border-none"
                    error={formikk.touched.password && formikk.errors.password}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-2">
                    <button
                      type="button"
                      className="h-full p-2 text-gray-600 focus:outline-none "
                      onClick={handleShowPassword}
                    >
                      {/* Icon mo
                      t de passe */}
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5  text-black" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-black" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ERRORS MESSAGES */}
            {errorLog && (
              <small className="absolute ml-16  text-sm italic text-red-500">
                Email / Mot de passe incorrect(s)
              </small>
            )}
            {errorStatus && (
              <small className="absolute -ml-2 text-sm italic text-red-500">
                🚨 Une erreur est survenue, veuillez nous excuser ! 🚗
              </small>
            )}
            {/* my-6 */}
            <div className="flex justify-center items-center mt-10 mb-6">
              {/* <Button type="submit" label="Se connecter" className="bg-secondary  mb-4 mt-2"/> */}
              {!loading && (
                <Button
                  type="submit"
                  label="Se connecter"
                  className="bg-secondary  mb-4 mt-2"
                />
              )}
              {loading && (
                <Button
                  type="submit"
                  disabled={true}
                  label="Connexion..."
                  className="bg-secondary  mb-4 mt-2 cursor-wait"
                />
              )}
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mb-4">
          <p className="h-3 mb-5 text-lg">
            <a className="text-dark cursor-pointer" onClick={forgetPassword}>
              Mot de passe oublié ?{" "}
            </a>
          </p>
        </div>
      </div>
      <div className="bg-[#f5f8f5] bg-opacity-95 p-2 rounded-b-[30px] flex flex-col items-center justify-center w-full max-w-md h-62 mb-4 shadow-xl">
        <div className="text-center mb-4 mt-4">
          <p className="text-4xl font-bold m-2">Besoin d'un trajet ?</p>
          <p className="text-4xl  font-bold m-2">Inscrivez vous ! </p>
        </div>
        <div className="selft-cente mb-6">
          <Button
            type="submit"
            onClick={openRegister}
            label="Inscription"
            className="bg-secondary  mb-4 mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
