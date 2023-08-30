import React from 'react'
import Button from '../../Custom/Button'
import { useNavigate } from 'react-router-dom';
import { URL_NEW_PROFILE } from '../../../constants/urls/urlFrontEnd';

const ButtonsAccount = ({ suppr, user}) => {

    const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-10 mt-5 xs:px-2 sm:px-0  xs:w-[400px] sm:w-auto">
{suppr ? (
    <>
        <div>
      <Button
        type="button"
        label="Revenir sur le profil"
        className={
          "mt-12 text-dark font-bold border-dark border-2 rounded text-lg "
        }
        onClick={() => navigate(URL_NEW_PROFILE)}
      ></Button>
    </div>
    <div>
      <Button
        type="submit"
        label={"Confirmez la suppression"}
        className={`bg-secondary mt-12 border-2 border-secondary font-bold text-lg`}
      ></Button>
    </div>
    </>
) : (
    <>
    <div>
  <Button
    type="button"
    label="Revenir sur le profil"
    className={
      "mt-12 text-dark font-bold border-dark border-2 rounded text-lg"
    }
    onClick={() => navigate(URL_NEW_PROFILE)}
  ></Button>
</div>
<div>
  <Button
    type="submit"
    label={user.actif ? "Confirmez la désactivation" : "Confirmez l'activation"}
    className={`bg-secondary mt-12 border-2 border-secondary font-bold text-lg`}
  ></Button>
</div>
</>
)}
  </div>
  )
}

export default ButtonsAccount
