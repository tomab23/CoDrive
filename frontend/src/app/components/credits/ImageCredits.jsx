import React from 'react'
import creditsImage from "../../assets/pictures/credits/credits.svg";

const ImageCredits = () => {
  return (
    <div className='flex justify-center'>
      <img src={creditsImage} alt="" className="h-[350px] mt-20" />
    </div>
  )
}

export default ImageCredits
