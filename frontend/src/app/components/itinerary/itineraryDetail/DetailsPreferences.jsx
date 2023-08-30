import React from 'react'
import smokingIcon from "../../../assets/pictures/Detail/smoking.svg";
import commentIcon from "../../../assets/pictures/Detail/comments.svg";
import musicIcon from "../../../assets/pictures/Detail/music.svg";

const DetailsPreference = ({ talk, smoke, music }) => {

    const preferenceSmoking = () => {
        if (!smoke) {
          return "Je ne fume pas"
        } else {
          return "Je fume"
        }
      }
    
    const preferenceDiscuss = () => {
        if (!talk) {
          return "Je ne discute pas durant le trajet"
        } else {
          return "J'aime discuter durant le trajet"
        }
      }
    
    const preferenceMusic = () => {
        if (!music) {
          return "Je n'écoute pas de musique"
        } else {
          return "J'écoute de la musique"
        }
      }
  return (
    <div className="flex-col sm:mx-4 sm:my-8 xl:ml-auto xs:self-center sm:mr-28 items-start">
    <div className="flex  p-2 space-x-4">
      <div className="w-4 h-4  mt-1">
        <img src={commentIcon} />
      </div>
      <div>
        <p>{preferenceDiscuss()}</p>
      </div>
    </div>

    <div className="flex  p-2 space-x-4">
      <div className="w-4 h-4  mt-1">
        <img src={musicIcon} />
      </div>
      <div>
        <p>{preferenceMusic()}</p>
      </div>
    </div>

    <div className="flex  p-2 space-x-4">
      <div className="w-4 h-4 mt-1">
        <img src={smokingIcon} />
      </div>
      <div>
        <p>{preferenceSmoking()}</p>
      </div>
    </div>
  </div>
  )
}

export default DetailsPreference
