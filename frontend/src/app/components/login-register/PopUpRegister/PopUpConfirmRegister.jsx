import React from "react";

const PopUpConfirmRegistre = ({ closePopup, login }) => {
  const handleClick = () => {
    closePopup();
    login();
  };

  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center z-50 ">
      <div className="bg-primary bg-opacity-95 p-2 rounded-t-[30px] flex flex-col w-full max-w-md">
        {/*  ICON FOR CLOSE THE POPUP */}
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
        {/* TITLE & TEXT */}
        <div className="mx-auto text-center">
          {/* TITLE  */}
          <p className="text-3xl font-bold mb-6"> Inscription Validée</p>
          {/* TEXT */}
          <div className="mb-5 text-lg">
            <p>
              <b>Votre inscription a bien été prise en </b>
            </p>
            <p>
              <b>compte!</b> Vous pouvez désormais
            </p>
            <p>
              profiter de vos <b>50 Crédits offerts </b>🎉
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#f5f8f5] bg-opacity-95 p-2 rounded-b-[30px] flex flex-col items-center justify-center w-full max-w-md h-62 mb-4 shadow-xl">
        <div className="text-center mb-4 mt-4">
          <p className="text-3xl font-bold m-2 text-black">Connectez Vous!</p>
        </div>
        {/* LOGIN BUTTON */}
          <button
            className="bg-secondary mt-2 px-6 py-2 rounded-lg font-bold mb-10"
            onClick={handleClick}
          >
            Connexion
          </button>
      </div>
    </div>
  );
};

export default PopUpConfirmRegistre;
