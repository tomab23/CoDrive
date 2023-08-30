import React from 'react'
import Button from './Custom/Button'
import { useNavigate } from 'react-router'


const ReturnButton = ({ className }) => {
   
  const navigate = useNavigate()

  return (
        <Button
        type={"button"}
        label="Retour"
        className={`py-1 outline outline-2 outline-dark text-dark bg-input  ${className}`}
        onClick={() => navigate(-1)}
      />
  )
}

export default ReturnButton
