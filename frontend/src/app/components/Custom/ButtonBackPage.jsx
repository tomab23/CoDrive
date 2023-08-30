import React from 'react'
import Button from './Button'

const ButtonBackPage = ({ onClick, className }) => {
  return (
        <Button
        label="Retour"
        className={` py-1 outline outline-2 outline-dark text-dark bg-input  ${className}`}
        onClick={onClick}
      />
  )
}

export default ButtonBackPage
