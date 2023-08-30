import React from "react";
import Navbar from "./../../components/layouts/Navbar";
import Footer from "./../../components/layouts/Footer";
import Input from "../../components/Custom/Input";
import { MailIcon } from "@heroicons/react/solid";
import Button from "../../components/Custom/Button";
import * as Yup from "yup";
import { REGEX_EMAIL } from "../../constants/regex";
import { useFormik } from "formik";
import axios from 'axios';

const ResetPassword = () => {
  const validSchema = Yup.object().shape({
    mail: Yup.string()
      .matches(REGEX_EMAIL, "Le format de l'adresse email n'est pas correct")
      .email("Le format de l'adresse email n'est pas correct")
      .required("L'email est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      mail: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));

    },
    validationSchema: validSchema,
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <header>
          <p className="text-2xl font-bold text-center my-10">Réinitialiser votre mot de passe</p>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center items-center gap-5 border border-black w-96 p-5">
          <div className="inline-flex items-center w-80">
            {/* EMAIL INPUT */}
            <Input
              type="email"
              name="mail"
              placeholder="Adresse email"
              className="rounded-full w-full font-medium  px-4 py-2  text-black"
              value={formik.values.mail}
              onChange={formik.handleChange}
              error={formik.touched.mail && formik.errors.mail}
            />
            {/* <div className="absolute inset-y-0 px- right-0 flex items-center pr-2">
              ICON EMAIL
              <MailIcon className="w-5 h-5 mr-2 text-black" />
            </div> */}
          </div>

          <div className="flex justify-center items-center">
            <Button
              type="submit"
              label="Réinitialiser"
              className="bg-secondary"
            />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;
