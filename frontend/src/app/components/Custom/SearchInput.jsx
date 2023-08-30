import React from 'react'
import Input from './Input'

const SearchInput = (placeholder, icon, id) => {
  return (
    <div className="inline-flex items-center w-80">
    <Input
      id={id}
      type="text"
      placeholder={placeholder}
      className="w-80 rounded bg-input pl-10 "
    />
    {/* ICON */}
    <div className="absolute ml-1 mt-2 flex items-center pr-2">
      <img
        src={icon}
        className="h-8 w-8 bg-input  p-2 relative z-40"
      />
    </div>
  </div>
  )
}

export default SearchInput
