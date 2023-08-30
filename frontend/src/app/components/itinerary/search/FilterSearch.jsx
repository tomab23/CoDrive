import React from 'react'
import Button from '../../Custom/Button'

const FilterSearch = ({ filter }) => {
  return (
    <div>
                  {filter ? (
            <div className="flex justify-center gap-5 mt-4">
              <Button
                type="button"
                label="Petit bagage"
                className=" bg-primary-light hover:bg-primary focus:bg-primary"
              />
              <Button
                type="button"
                label="Gros bagage"
                className="bg-primary-light hover:bg-primary focus:bg-primary"
              />
            </div>
          ) : (
            <div className="mt-10"></div>
            // avec mt-20 , sans mouvement de div
          )}
      
    </div>
  )
}

export default FilterSearch
