import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51NF8hxKBWAiPiCSPtcoQCx48lHOJtJO2DPNIlVCm3oWWHLqM6UAhKHIJINBAYP8IoRBZiqIe5Q7tKEzP0MWiOkAY003QNuFgTR"
);

export default function Index() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { email },
    });

    const response = await fetch("/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        paymentMethodId: paymentMethod.id,
        priceId: "price_1Ra512KBWAiPiCSPX8e8RQ2w",
      }),
    });

    const { clientSecret } = response?.data;

    const confirmResponse = await stripe.confirmCardPayment(clientSecret);
    if (confirmResponse.paymentIntent.status === "succeeded") {
      alert("Subscription successful!");
    } else {
      alert("Subscription failed.");
    }
  };

  return (
    <Elements stripe={stripePromise} >
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Subscribe
        </button>
      </form>
    </Elements>
  );
}
