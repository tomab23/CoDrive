import React from 'react'
import FaqQuestion from './FaqQuestion'

const FaqAllQuestions = () => {
  return (
    <div className="flex flex-col gap-5">
    <FaqQuestion
      question="Comment réserver un trajet ? "
      info="Vous devez être connecté, vous pouvez utiliser la recherche de la page d'accueil ou chercher un trajet depuis votre barre de navigation, après votre recherche faite si des trajets existent vous cliquez sur la carte du trajet que vous souhaitez réserver, arriver sur la page de détails, en bas, vous trouverez un bouton pour pouvoir réserver ce trajet."
    />
    <FaqQuestion
      question="Comment se faire rembourser ses crédits ?"
      info="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con. Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    />
    <FaqQuestion
      question="Puis-je modifier les informations de mon trajet ?"
      info="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con. Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    />
    <FaqQuestion
      question="Quel délai pour la confirmation d’un trajet ?"
      info="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con. Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    />
  </div>
  )
}

export default FaqAllQuestions
