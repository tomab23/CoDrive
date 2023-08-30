import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = 
"pk_test_51NU7ZPIbXLwDNEFQUp3fHHAryB7injCVhYqdklETiVc6AGTsxyMYob7WVjtIdMlTX2wt5n9z2NPho8mNTgGYfPkN00zetfnnwq";
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default StripeContainer
