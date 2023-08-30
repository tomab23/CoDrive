import React, { useEffect, useState } from "react";
import Button from "../../../components/Custom/Button";

const CarPopUp = ({ values, colors, setIsShow, handleConfirmationSubmit, imageUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const doors = ["3 porte", "5 porte"];
  const airConditioner = ["Véhicule non climatisé", "Véhicule climatisé"];
  const chest = ["Le véhicule comporte un coffre", "n'en comporte pas"];
  const [color, setColors] = useState();
  useEffect(() => {
    setColors((colors.find((color) => color.id === values.colorCar)?.color || ""));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center z-50 ">
      <div className="bg-primary bg-opacity-95 p-2 rounded-t-[30px] flex flex-col w-full max-w-md">
        <div className="mx-auto">
          {/* TITLE  */}
          <div className="mb-8">
            <p className="text-xl font-bold text-black text-center mb-5 mt-8">
              Valider la création de votre véhicule
            </p>
            <p className="text-ml text-black text-center">
              Les informations sont correctes ? <span className="font-bold text-black text-center">Appuyez sur Valider !</span>
            </p>
            <p className="text-ml text-black text-center mt-4">
              Ou <span className="font-bold text-black text-center">Retour</span> pour modifiez vos choix
            </p>
          </div>
        </div>
      </div>
      <div className="bg-cyan-50 bg-opacity-95 p-2 rounded-b-[30px] flex flex-col w-full max-w-md shadow-2xl">
        <p className="text-ml text-black text-center">
          Les informations que vous nous avez fournies :
        </p>
        <div className="flex flex-col ml-[15%] my-2">
          <div className="flex flex-row my-2">
            <p>Nom du véhicule: &nbsp;</p>
            <span className="font-bold text-black">{values.brand}</span>
          </div>
          <div className="flex flex-row my-2">
            <p>Nombre de porte: &nbsp;</p>
            <span className="font-bold text-black">{doors[Number(values.door)]}</span>
          </div>
          <div className="flex flex-row my-2">
            <p>Air conditionner: &nbsp;</p>
            <span className="font-bold text-black">{airConditioner[Number(values.airConditioner)]}</span>
          </div>
          <div className="flex flex-row my-2">
            <p>Couleur: &nbsp;</p>
            <span className="font-bold text-black">{color}</span>
          </div>
          <div className="flex flex-row my-2">
            <p>Coffre: &nbsp;</p>
            <span className="font-bold text-black">{chest[Number(values.chest)]}</span>
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <p className="text-center">Images sélectionnées: </p>
          <div className="flex justify-center gap-10 my-2 text-black font-bold">
            {imageUpload.length} image{imageUpload.length !== 1 && "s"}
          </div>
        </div>

        <div className="flex flex-row justify-around mt-12 mb-6">
          <Button
            type="button"
            className="bg-secondary items-center"
            label="retour"
            onClick={() => setIsShow(false)} />
          {!isLoading ? (
            <Button
              type="button"
              className="bg-secondary items-center"
              label="Valider"
              onClick={async () => {
                setIsLoading(true);
                await handleConfirmationSubmit();
              }}
            />
          ) : (
            <Button
              type="button"
              className="bg-secondary px-6 py-2 rounded-lg font-bold cursor-wait"
              label="Création..."
              disabled
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarPopUp;
