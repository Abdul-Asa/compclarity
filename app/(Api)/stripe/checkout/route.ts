import { type NextRequest, NextResponse } from "next/server";
import { toUrlFriendly } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
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
  const body = await request.json();
  const priceId = await getPriceId(body.service);

  //Save the data to the database

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer_email: body.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${body.origin}?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    const supabase = createClient();

    const { error: supabaseError } = await supabase.from("payments").insert({
      full_name: body.firstName + " " + body.lastName,
      email: body.email,
      phone: body.phoneNumber,
      file_names: body.fileNames,
      service: body.service,
      price: priceId,
      session_id: session.id,
      session_status: session.status,
      additional_info: body.additionalInfo,
    });
    if (supabaseError) {
      throw new Error(supabaseError.message);
    }

    return NextResponse.json({
      clientSecret: session.client_secret,
      session,
    });
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
