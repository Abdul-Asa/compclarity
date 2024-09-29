import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const getPriceId = async (service: string) => {
//   let lookupKey = "CV_service_1";
//   if (service === "interview-coaching") {
//     lookupKey = "CV_service_2";
//   }
//   const prices = await stripe.prices.list({
//     lookup_keys: [lookupKey],
//   });
//   return prices.data[0].id;
// };

export async function POST(request: NextRequest) {
  const { email, service, origin } = await request.json();

  let object: any = {
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: service.title,
          },
          unit_amount: service.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    ui_mode: "embedded",
    redirect_on_completion: "if_required",
    return_url: `${origin}?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: { enabled: true },
  };

  if (email !== "") {
    object.customer_email = email;
  }

  try {
    const session = await stripe.checkout.sessions.create(object);
    return NextResponse.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "No session ID provided" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      payment_status: session.payment_status,
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
