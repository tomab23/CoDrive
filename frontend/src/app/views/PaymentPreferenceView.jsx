import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useNavigate } from "react-router-dom";
import { URL_BANK_DETAILS } from "../constants/urls/urlFrontEnd";

const PaymnentPreferenceView = () => {
  const navigate = useNavigate();

  return (
    <div className="PaymentPreferencView">
      {/**Navabar */}
      <Navbar></Navbar>

      {/*titre*/}
      <h3 className="mt-16 mb-14 font-bold ml-20">Préférence de paiement</h3>

      {/*contenu*/}
      <h3 className="text-center font-bold mt-32">
        Choisissez votre{" "}
        <span className="bg-primary">méthode de paiement </span>favorite
      </h3>
      <h5
        className="text-center font-bold text-dark mt-24 cursor-pointer"
        onClick={() => navigate(URL_BANK_DETAILS)}
      >
        Virement bancaire
      </h5>
      <div className="flex justify-center">
        <h5
          className="border-t border-[#47634F50] w-96 font-bold text-dark text-center mt-12 pt-12 cursor-pointer"
          onClick={() => alert("page paypal")}
        >
          Paypal
        </h5>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PaymnentPreferenceView;
