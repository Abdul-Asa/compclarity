"use server";
import { headers } from "next/headers";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createStripeSession() {
  const headersList = headers();

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: [
        {
          price: "price_1PzVZERsesZ5eGVDr6AuIofW",
          quantity: 1,
        },
      ],
      return_url: "http://localhost:3000/about",
    });

    if (!session.client_secret) {
      return {
        error: true,
        message: "No client secret",
      };
    }
    return {
      clientSecret: session.client_secret,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Error creating stripe session",
    };
  }
}
