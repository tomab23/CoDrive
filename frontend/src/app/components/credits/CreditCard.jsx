import React from 'react'

const CreditCard = () => {
  return (
    <div className="flex justify-center mb-10">
    <div className="flex flex-col items-center w-[400px] ">
      {/* LINE 1 */}
      <h6 className="self-start">Propriétaire de la carte</h6>
      <input
        type="text"
        className="w-full rounded border border-gray-400 bg-input"
      />
      {/* LINE 2 */}
      <h6 className="self-start">Numéro de carte</h6>
      <input
        type="text"
        className="w-full rounded border border-gray-400 bg-input"
      />
      {/* LINE 3 */}
      <div className="flex self-start gap-5">
        <div>
          <h6>Date d’expiration</h6>
          <input
            type="text"
            className="w-full rounded border border-gray-400 bg-input"
          />
        </div>
        <div>
          <h6>Cryptogramme visuel</h6>
          <input
            type="text"
            className="w-full rounded border border-gray-400 bg-input"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreditCard
