import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import { useFormik } from "formik";
import Input from "../../components/Custom/Input";
import Button from "../../components/Custom/Button";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import {
  URL_NEW_PROFILE,
  URL_PROFILE,
  URL_WELCOME,
} from "../../constants/urls/urlFrontEnd";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/layouts/Footer";
import ReturnButton from "../../components/ReturnButton";
import PasswordInputAccount from "../../components/profile/account/PasswordInputAccount";
import * as Yup from "yup";
import TextAccount from "../../components/profile/account/TextAccount";
import { choiceActif } from "../../api/backend/account";
import ButtonsAccount from "../../components/profile/account/ButtonsAccount";

const AccountStatusView = ({ suppr }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state;

  const [error, setError] = useState(false);

  const ValidSchema = Yup.object().shape({
    password: Yup.string().required("Mot de passe obligatoire"),
    confirmPassword: Yup.string().required(
      "Veuillez confirmer votre mot de passe"
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidSchema,
    onSubmit: (values) => {
      setError(false);
      console.log(values);
      if (values.password === values.confirmPassword) {
        const password = {
          password: values.password,
        };
        if (suppr) {
          alert("SUPPRIMER")
        } else {
          handleActif(password);
        }
      } else {
        setError(true);
      }
    },
  });

  const handleActif = (password) => {
    try {
      if (user.actif) {
        choiceActif(false, password);
      } else if (!user.actif) {
        choiceActif(true, password);
      }
      navigate(URL_NEW_PROFILE)
    } catch (e) {
      console.log(e.code);
    }
  };

  useEffect(() => {
    setError(false);
  }, [formik.values.password, formik.values.confirmPassword]);

  return (
    <div>
      {/*navabr*/}
      <Navbar></Navbar>

      <div className="xl:ml-20 xs:ml-2 mt-5">
        <ReturnButton />
      </div>
      {/*titre*/}
      <div className="grid xl:place-content-center  xs:ml-2 xl:ml-0 gap-6">
        <h5 className="mt-5 mb-14 font-bold 
         xs:w-[300px] sm:w-auto">
          Vous souhaitez{" "}
          {suppr ? (
            <span className="bg-primary p-1">supprimer votre compte ?</span>
          ) : (
            <>
              {user.actif ? (
                <span className="bg-primary p-1">
                  désactiver votre compte ?
                </span>
              ) : (
                <span className="bg-primary p-1">Activer votre compte ?</span>
              )}
            </>
          )}
        </h5>
        {/*texte*/}
        <TextAccount suppr={suppr} user={user} />
        {/*Entrez le mot de passe*/}
        <div className="font-bold text-[30px] mt-10 mb-10  xs:w-[400px] sm:w-auto">
          {suppr ? (
            <h5>
              Entrez votre mot de passe pour{" "}
              <span className="bg-primary p-1">valider la suppression</span>
            </h5>
          ) : (
            <>
              {user.actif ? (
                <h5>
                  Entrez votre mot de passe pour{" "}
                  <span className="bg-primary p-1">
                    valider la désactivation
                  </span>
                </h5>
              ) : (
                <h5>
                  Entrez votre mot de passe pour{" "}
                  <span className="bg-primary p-1">valider l'activation</span>
                </h5>
              )}
            </>
          )}
        </div>

        {/*PASSWORD FORM*/}
        <form
          onSubmit={formik.handleSubmit}
          className="grid justify-items-center gap-6 "
        >
          <PasswordInputAccount formik={formik} />

          {/* ERROR MESSAGES */}
          {error && (
            <p className="text-red-600 font-bold ">
              Les mots de passe ne correspondent pas
            </p>
          )}
          <p className="text-red-600 font-bold">
            {(formik.touched.password && formik.errors.password) ||
              (formik.touched.confirmPassword && formik.errors.confirmPassword)}
          </p>

          {/* BUTTONS */}
          <ButtonsAccount suppr={suppr} user={user} />
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default AccountStatusView;
