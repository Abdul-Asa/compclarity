"use client";

import getStripe from "@/lib/stripe/load-stripe";
import { createStripeSession } from "./action";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
const StripePayment = ({ options }: { options: any }) => {
  return (
    <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default StripePayment;
