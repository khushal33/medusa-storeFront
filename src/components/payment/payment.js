import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "medusa-react"
import React, { useMemo } from "react"
import PaymentForm from "./payment-form"

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY || "pk_test_51NBIFySCmS4G9Nhptld4zW5q3el6uKdZH9g5f1dOTnGhERGAABkt4wJYpyP4h5RdiHTsAWS04xff5t560A6T1qkr00GF6m2g76"
const stripePromise = loadStripe(STRIPE_KEY)


const Payment = ({ handleSubmit, setLoading }) => {
  const { cart } = useCart()

  const stripeSession = useMemo(() => {
    if (cart.payment_sessions) {
      return cart.payment_sessions.find(s => s.provider_id === "stripe")
    }

    return null
  }, [cart.payment_sessions])

  if (!stripeSession) {
    return null
  }

  const options = {
    client_secret: stripeSession.data.client_secret,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        session={stripeSession}
        handleSubmit={handleSubmit}
        setLoading={setLoading}
      />
    </Elements>
  )
}

export default Payment
