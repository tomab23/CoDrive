import React from "react";
import Input from "../../Custom/Input";
import { MailIcon } from "@heroicons/react/solid";
import Button from "../../Custom/Button";
import * as Yup from "yup";
import { REGEX_EMAIL } from '../../../constants/regex';
import { useFormik } from "formik";

const ForgotPassword = ({ closePopup, resetPassword}) => {

  const validSchema = Yup.object().shape({
    mail: Yup.string()
    .matches(REGEX_EMAIL, "Le format de l'adresse email n'est pas correct")
    .email("Le format de l'adresse email n'est pas correct")
    .required("L'email est obligatoire"),
  })

  const formik = useFormik({
    initialValues:{ 
     mail: "",
   } ,
   onSubmit:(values) =>{
    alert(JSON.stringify(values));
    resetPassword();
   },
   validationSchema: validSchema,
   });

  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center z-50">
      <div className="bg-primary bg-opacity-95 p-2 rounded-[30px] flex flex-col w-full max-w-md">
        {/* ICON TO CLOSE POPUP */}
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

        {/* CONTAIN FORGET PASSWORD */}
        <div className="flex flex-col justify-center items-center my-6">
          {/* TITLE */}
          <p className="text-2xl font-bold text-black">
            Réinitialiser votre mot de passe
          </p>
          <p className=" w-80 text-center my-6">
            Veuillez entrer <b>l’adresse mail de votre compte CoDrive</b> pour créer un
            nouveau mot de passe et <b>profitez de vos crédits.</b>
          </p>
          {/* FORM TO RESET EMAIL */}
          <form onSubmit={formik.handleSubmit}>
          <div className="relative flex items-center justify-center">
            <div className="inline-flex items-center w-80">
              {/* EMAIL INPUT */}
              <Input
                type="email"
                name="mail"
                placeholder="Adresse email"
                className="rounded-full w-full font-medium  px-4 py-2  text-black border-none"
                value={formik.values.mail}
                onChange={formik.handleChange}
                error={formik.touched.mail && formik.errors.mail}
              />
              <div className="absolute inset-y-0 px- right-0 flex items-center pr-2">
                {/* ICON EMAIL */}
                <MailIcon className="w-5 h-5 mr-2 text-black" />
              </div>
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <div className="flex justify-center items-center mt-8">
            <Button
              type="submit"
              label="Réinitialiser"
              className="bg-secondary"
            />
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
