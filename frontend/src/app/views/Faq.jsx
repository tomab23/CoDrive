import React from "react";
import imageFaq from "../assets/pictures/questions.svg";
import Navbar from "../components/layouts/Navbar";
import Button from "./../components/Custom/Button";
import { useNavigate } from "react-router-dom";
import { URL_CONTACT_US } from "../constants/urls/urlFrontEnd";
import Footer from "../components/layouts/Footer";
import FaqAllQuestions from "../components/faq/FaqAllQuestions";
import ReturnButton from "../components/ReturnButton";




const Faq = () => {
  const navigate = useNavigate();


  return (
    <div>
      <Navbar />

      {window.innerWidth > 500 &&
        <div className="mt-5">
        <ReturnButton className={"xl:ml-20 sm:ml-10"} />
        </div>
      }

      <h4 className="font-bold mb-10 
      xl:ml-20 
      sm:ml-10 sm:text-3xl sm:mt-5
      xs:ml-6 xs:text-xl xs:mt-10">
        Foire aux <span className="bg-primary p-1">questions</span>
      </h4>

      <div className="flex 
      xl:ml-20 xl:flex-row xl:justify-start xl:gap-44
      sm:mx-auto sm:flex-col sm:items-center sm:gap-20
      xs:mx-auto xs:flex-col xs:items-center xs:gap-10">
        <FaqAllQuestions />
        <div>
          <img src={imageFaq} alt="" className="xl:h-96 xl:w-96 sm:h-52 sm:w-52 xs:h-36 xs:w-36" />
        </div>
      </div>

      <div className="text-center mt-20 mb-10">
        <p>Vous ne trouvez pas la réponse à votre question ?</p>
        <p>
          <b>
            Contactez les équipes CoDrive directement en nous envoyant un
            message via la page Contact.
          </b>
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          label="Contact"
          className="bg-secondary"
          onClick={() => navigate(URL_CONTACT_US)}
        />
      </div>  

      <div className="xs:-mt-32 sm:-mt-20 xl:-mt-0">
      <Footer />
      </div>
    </div>
  );
};

export default Faq;
