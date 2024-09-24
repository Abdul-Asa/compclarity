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
  //   const session = await stripe.checkout.sessions.create({
  //       ui_mode: "embedded",
  //       customer_email: res.email,
  //       line_items: [
  //       {
  //           price: priceId,
  //           quantity: 1,
  //       },
  //       ],
  //       mode: "payment",
  //       return_url: `${request.url}/return?session_id={CHECKOUT_SESSION_ID}`,
  //       automatic_tax: { enabled: true },
  //   });

  //   res.send({clientSecret: session.client_secret});
  // } catch (err) {
  //   res.status(err.statusCode || 500).json(err.message);
  // }

  return NextResponse.json({ message: JSON.stringify(request, null, 2), priceId });
}
