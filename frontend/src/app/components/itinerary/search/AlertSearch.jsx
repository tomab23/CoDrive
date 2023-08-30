import React from "react";

const AlertSearch = () => {
  return (
    <div className="mt-40 sl:flex sm:flex-col xs:text-center items-center">
      <h6>Vous ne trouver pas le trajet idéal ?</h6>
      <h6>
        N'hésitez pas à{" "}
        <span className="font-bold">
          créer une alerte pour être unformé.es des nouveautés
        </span>
      </h6>
      <button
        className="bg-secondary p-1 rounded mt-10 font-bold w-32"
        onClick={() => alert("être alerté")}
      >
        Etre alerté.e
      </button>
    </div>
  );
};

export default AlertSearch;
