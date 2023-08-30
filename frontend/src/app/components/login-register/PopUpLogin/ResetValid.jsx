import React from "react";

const ResetValid = ({ closePopup }) => {
  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center z-50">
      <div className="bg-primary bg-opacity-95 p-2 rounded-[30px] flex flex-col w-full max-w-md">
        {/* ICON FOR CLOSE POPUP */}
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
          <p className="text-2xl font-bold text-black mb-6 -mt-2">
          Réinitialiser votre mot de passe
          </p>
          {/* MESSAGE */}
          <p>
            <b>Un mail vous a été envoyé.</b>
          </p>
          <p>
            <b>Vérifiez vos spams</b> si la réception tarde.
          </p>
          <p className="mt-6 cursor-pointer " onClick={() => alert("nouveau mail envoyé")}><i>Je n’ai pas reçu de mail. En recevoir un nouveau.</i></p>
        </div>
      </div>
    </div>
  );
};

export default ResetValid;
