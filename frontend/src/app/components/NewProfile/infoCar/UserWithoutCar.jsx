import React from 'react'
import voiture2 from "../../../assets/pictures/profile/voiture2.svg"
import Button from '../../Custom/Button'
import { useNavigate } from 'react-router-dom'
import { URL_CREDITS } from '../../../constants/urls/urlFrontEnd'

const UserWithoutCar = () => {

  const navigate = useNavigate();

  return (
    <div className="mt-20 mx-20 mb-10">
    <h3 className="font-bold">
      Vous n'êtes <span className="bg-primary p-1">pas véhiculé ?</span>
    </h3>
    <div className="grid grid-cols-2 gap-32">
      <div className="mt-20 font-medium">
        <h5>
          Vous ne possédez pas de permis B ? Ce n’est pas un problème.
          CoDrive vous permet{" "}
          <span className="text-dark font-bold cursor-pointer hover:underline" onClick={() => navigate(URL_CREDITS)}>d’acheter vos crédits</span>{" "}
          afin de{" "}
          <span className="font-bold">
            profiter des services de la plateforme.
          </span>
        </h5>
        <h5 className="mt-4">
          <span className="font-bold">Si vous obtenez votre permis{" "}</span>
          après inscription, il est possible de changer vos paramètres{" "}
          <span className="font-bold">en modifiant vos informations.</span>
        </h5>
        <div className="text-center mt-16">
    <Button
          label={"Modifier mes informations"}
          className={"bg-secondary text-xl ml-12"}
          onClick={() => alert("page modifier informations")}
        ></Button>
        </div>
      </div>
      <div >
        <img src={voiture2}></img>
      </div>
    </div>        
  </div>
  )
}

export default UserWithoutCar
