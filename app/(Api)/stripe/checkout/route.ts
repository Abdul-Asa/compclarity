import { type NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getPriceId = async (service: string) => {
  let lookupKey = "CV_service_1";
  if (service === "interview-coaching") {
    lookupKey = "CV_service_2";
  }
  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey],
  });
  return prices.data[0].id;
};

export async function POST(request: NextRequest) {
  const res = await request.json();
  const priceId = await getPriceId(res.service);

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer_email: res.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${res.origin}?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ clientSecret: session.client_secret, session });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
