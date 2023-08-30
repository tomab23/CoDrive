import React from 'react'
import { useNavigate } from 'react-router';
import { URL_CREDITS } from '../../constants/urls/urlFrontEnd';
import Button from '../Custom/Button';

const ButtonBackCredits = ({ points, home }) => {

    const navigate = useNavigate();

    const backCredits = () => {
        navigate(URL_CREDITS, {
          state: {
            points: points,
          },
        });
      };

  return (
    <>
        <Button
          label={home ? "Aller au portefeuille" : "Revenir au portefeuille"}
          className="py-1 border-2 border-dark text-dark bg-input"
          onClick={backCredits}
        />
    </>
  )
}

export default ButtonBackCredits
