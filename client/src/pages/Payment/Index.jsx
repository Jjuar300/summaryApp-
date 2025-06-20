import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

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
  );
}
