import React, { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Button from "../components/Custom/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
// import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeToast from "../components/CloseToast";
import emailjs from "@emailjs/browser";
import imageContact from "../assets/pictures/contactUs.svg";
import ErrorNotify from "../components/notify/ErrorNotify";
import ReturnButton from "../components/ReturnButton";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  /**
   * For the message with toastify.
   */
  const toastId = React.useRef(null);

  /**
   * Succes message with toastify
   */
  const notifyMailSend = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Votre email a bien été envoyé, merci", {
        theme: "green",
        icon: "🚙",
        style: { color: "black", backgroundColor: "#92E3A9" },
      });
    }
  };

  const ValidSchema = Yup.object().shape({
    object: Yup.string().required("L'objet est obligatoire"),
    name: Yup.string().required("Votre prénom et nom sont obligatoires"),
    mail: Yup.string()
      .email("Adresse email invalide")
      .required("Adresse email obligatoire"),
    message: Yup.string()
      .min(10, "Votre message est trop court")
      .max(500, "Votre message est trop long")
      .required("Le message est obligatoire"),
    reference: Yup.string()
      .min(6, "la référence est trop courte")
      .max(12, "la référence est trop longue"),
    // recaptcha: Yup.string()
    //   .required("Vous devez cocher")
  });

  // Email parameters to contact us
  const yourServiceId = "service_nukqe31";
  const yourTemplateId = "template_o112ftl";
  const yourPublicId = "vf5_j005PD0S1d1KO";
  /**
   * Function to send the email.
   * @param {*} values values of form contact
   */
  const sendMail = (values, { resetForm }) => {
    emailjs
      .send(yourServiceId, yourTemplateId, values, yourPublicId)
      .then((result) => {
        console.log("result", result);
        notifyMailSend();
        setLoading(false);
        resetForm();
      })
      .catch(() => {
        ErrorNotify(toastId);
        setLoading(false);
        resetForm();
      });
  };

  const formik = useFormik({
    initialValues: {
      object: "",
      name: "",
      mail: "",
      reference: "",
      message: "",
      // recaptcha: "",
    },
    enableReinitialize: true,
    validationSchema: ValidSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      sendMail(values, { resetForm });
    },
  });

  return (
    <>
      <Navbar />

    {window.innerWidth > 500 &&
         <div className="mt-5">
         <ReturnButton className={"xl:ml-20 sm:ml-10 xs:ml-3"} />
       </div>
    }
      
      <h4 className="mb-10 
      xl:ml-20 
      sm:mt-5 sm:ml-10 sm:text-3xl
      xs:mt-10 xs:ml-3 xs:text-xl">
        <span className="bg-primary p-1 font-bold">Contactez-nous</span>
      </h4>
      {/* BODY */}
      <div className="flex xl:flex-row sm:flex-col xs:flex-col xs:items-center sm:items-center justify-start xl:ml-20 ">
        {/* TEXT + IMG */}
        <div className="xl:flex xl:flex-col
        sm:flex sm:flex-row sm:items-center"> 
          <div className="xl:text-xl sm:text-lg xs:text-base xs:mb-5 sm:px-0 xs:px-2">
            <p>
              <b>Besoin de renseignements</b> à propos des services de
            </p>
            <p>CoDrive ? Nos équipes sont là pour vous aiguiller.</p>
            <p>
              Vous recevrez une réponse <b>sous 48 heures</b>.
            </p>
          </div>
        {window.innerWidth > 500 &&
                    <div className="xl:mt-10">
                    <img
                      src={imageContact}
                      alt="image d'un ordinateur"
                      className="xl:w-[450px] sm:w-[150px] "
                    />
                  </div>
        }
        </div>
        {/* CONTACT FORM */}
        <form
          className="flex flex-col gap-3 xl:ml-48 xl:w-[600px] xs:p-5 xs:-mb-28"
          onSubmit={formik.handleSubmit}
        >
          <p className="text-gray-500 sm:text-base xs:text-xs">
            Les champs marqués d'un astérisque (*) sont obligatoires.
          </p>
          {/* OBJECT */}
          <div className="flex flex-col gap-1">
            <p>
              Objet <span className="text-red-600">*</span>
            </p>
            <select
              name="object"
              id="object"
              className="bg-input"
              onChange={formik.handleChange}
              value={formik.values.object}
              error={formik.touched.object && formik.errors.object}
            >
              <option value="" className="bg-input">
                -- Choisissez
              </option>
              <option value="Client">Service client</option>
              <option value="Technique">Support technique</option>
            </select>
            <p className="text-red-500 text-xs absolute mt-[4.3rem]">
              {formik.errors && formik.touched.object && formik.errors.object}
            </p>
          </div>

          {/* NAME */}
          <div className="flex flex-col gap-1 mt-1">
            <p>
              Prénom - Nom<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              placeholder="Prenom et nom"
              name="name"
              id="name"
              className="bg-input"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <p className="text-red-500 text-xs absolute mt-[4.3rem]">
              {formik.errors && formik.touched.name && formik.errors.name}
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1 mt-1">
            <p>
              Adresse e-mail <span className="text-red-600">*</span>
            </p>
            <input
              type="email"
              placeholder="Email"
              name="mail"
              id="mail"
              className="bg-input"
              value={formik.values.mail}
              onChange={formik.handleChange}
            />
            <p className="text-red-500 text-xs absolute mt-[4.3rem]">
              {formik.errors && formik.touched.mail && formik.errors.mail}
            </p>
          </div>

          {/* REFERENCE */}
          <div className="flex flex-col gap-1 mt-1">
            <p>
              Référence du trajet{" "}
              <span className="text-gray-500">(facultatif)</span>
            </p>
            <input
              type="text"
              placeholder="Reference"
              name="reference"
              id="reference"
              className="bg-input"
              value={formik.values.reference}
              onChange={formik.handleChange}
            />
            <p className="text-red-500 text-xs absolute mt-[4.3rem]">
              {formik.errors &&
                formik.touched.reference &&
                formik.errors.reference}
            </p>
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-1 mt-1">
            <p>
              Message <span className="text-red-600">*</span>
            </p>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Tapez votre message ici. 500 caractères maximum."
              maxLength={500}
              onChange={formik.handleChange}
              value={formik.values.message}
              className="resize-none bg-input"
            ></textarea>
            <p className="text-red-500 text-xs absolute mt-[10.3rem]">
              {formik.errors && formik.touched.message && formik.errors.message}
            </p>
          </div>

          {/* <ReCAPTCHA
          className="mt-5 mb-2 self-center"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={(value) => {
            formik.setFieldValue("recaptcha", value)
          }}
          onBlur={formik.handleBlur}
        />
                  <p className="text-red-500 text-xs -mt-5 ml-[9.3rem]">
            {formik.errors && formik.touched.recaptcha && formik.errors.recaptcha}
          </p> */}

          {/* BUTTON */}
          {/* {formik.values.recaptcha === "" ? (
                  <Button
                  type="submit"
                  label="Envoyer"
                  disabled={true}
                  className="bg-gray-400 self-center cursor-not-allowed"
                />
        ) : (
          <Button
          type="submit"
          label={!loading ? "Envoyer" : "envoi..."}
          className="bg-secondary self-center"
          disabled={!loading ? false : true}
        />
        )} */}
          <Button
            type="submit"
            label={!loading ? "Envoyer" : "envoi..."}
            className="bg-secondary self-center"
            disabled={!loading ? false : true}
          />
          <ToastContainer
            position="top-center"
            style={{ width: "28rem", fontWeight: "bold", textAlign: "center" }}
            closeButton={closeToast}
            autoClose={10000}
          />
        </form>
      </div>
      <div className="-mt-20">
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
