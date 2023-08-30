import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios';

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if(!error) {
      console.log("Token généré", paymentMethod);

    }
  }

  return (
    <form onSubmit={handleSubmit} style={{width: 400}}>
      <CardElement
        options={{
          hidePostalCode: true,
          
        }}
      />
      <button className='my-10'>PAYER</button>
    </form>
  )
}

export default CheckoutForm
