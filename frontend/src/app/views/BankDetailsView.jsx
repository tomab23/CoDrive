import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useFormik } from "formik";
import Input from "../components/Custom/Input";
import Button from "../components/Custom/Button";
import { useNavigate } from "react-router-dom";
import { URL_PROFILE } from "../constants/urls/urlFrontEnd";

const BankDetailsView = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      country: "France",
      accountOwner: "Nom et prénom",
      IBAN: "",
      BIC: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmited(values);
    },
  });

  return (
    <div className="BankDetailsView">
      {/**Navabar */}
      <Navbar></Navbar>

      {/*titre*/}
      <h3 className="mt-16 mb-14 font-bold ml-20">Préférence de paiement</h3>

      {/*contenu*/}
      <h3 className="text-center font-bold my-32">
        Renseignez vos <span className="bg-primary">coordonnées bancaires</span>
      </h3>
      {/*fomulaire mot de passe*/}
      <form
        onSubmit={formik.handleSubmit}
        className="grid justify-items-center gap-6  "
      >
        <div>
          <label htmlFor="country" className="text-2xl font-bold">
            Pays
          </label>
          <div className="my-3 relative flex items-center">
            <Input
              id="country"
              name="country"
              type={"text"}
              onChange={formik.handleChange}
              value={formik.values.country}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="accountOwner" className="text-2xl font-bold">
            Titulaire du compte
          </label>
          <div className="my-3 relative flex items-center">
            <Input
              id="accountOwner"
              name="accountOwner"
              type={"text"}
              onChange={formik.handleChange}
              value={formik.values.accountOwner}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="IBAN" className="text-2xl font-bold">
            IBAN (chiffres et lettres)
          </label>
          <div className="my-3 relative flex items-center">
            <Input
              id="IBAN"
              name="IBAN"
              type={"text"}
              onChange={formik.handleChange}
              value={formik.values.IBAN}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="BIC" className="text-2xl font-bold">
            BIC
          </label>
          <div className="my-3 relative flex items-center">
            <Input
              id="BIC"
              name="BIC"
              type={"text"}
              onChange={formik.handleChange}
              value={formik.values.BIC}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
            />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <div>
            <Button
              type="submit"
              label="Valider mes coordonnées"
              className={"bg-secondary mt-12 font-bold text-[22px]"}
              onClick={() => alert("Coordonnées enregistrées")}
            ></Button>
          </div>
          <div>
            <Button
              type="submit"
              label="Revenir sur le profil"
              className={
                "ml-7 mt-12 text-dark font-bold text-[22px] border-[3px] border-dark rounded-[10px]"
              }
              onClick={() => navigate(URL_PROFILE)}
            ></Button>
          </div>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default BankDetailsView;
