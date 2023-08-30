import React from 'react'

const TitleAdmin = ({ title, className }) => {
  return (
    <h6 className={` text-center font-bold underline ${className}`}>{title}</h6>
  )
}

export default TitleAdmin
