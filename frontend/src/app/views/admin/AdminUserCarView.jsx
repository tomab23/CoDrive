import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layouts/Navbar'
import ReturnButton from '../../components/ReturnButton'
import CardCarAdmin from '../../components/cards/CardCarAdmin'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/layouts/Footer'

const AdminUserCarView = () => {

  const location = useLocation();

  const user = location.state.infos
  const cars = user.car


  return (
    <div>
      <Navbar />
      {cars.length > 1 ? (
        <h4 className='mt-10 mb-5 ml-20 font-bold'>Voitures de <span className=''>{user.firstname} {user.lastname}</span></h4>
      ) : (
        <h4 className='mt-10 mb-5 ml-20 font-bold'>Voiture de <span className=''>{user.firstname} {user.lastname}</span></h4>
      )}
      <ReturnButton className={"ml-20"}/>

      {/* <div className='ml-10 mt-10 flex flex-wrap gap-10 items-center'> */}
      <div className='ml-10 mt-10 flex flex-col gap-10 items-center'>
        {cars.map((car) => (
          <CardCarAdmin key={car.id} car={car} />
        ))}

     

      </div>
      <Footer />
    </div>
  )
}


export default AdminUserCarView
