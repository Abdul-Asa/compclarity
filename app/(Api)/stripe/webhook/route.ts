import { createClient } from "@/lib/supabase/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("STRIPE_WEBHOOK_SECRET is not configured", { status: 500 });
  }

  const signature = request.headers.get("Stripe-Signature");
  if (!signature) {
    return new Response("No signature", { status: 401 });
  }

  const event = await stripe.webhooks.constructEventAsync(
    await request.text(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case "payment_intent.succeeded":
      const session = await stripe.checkout.sessions.list({
        payment_intent: event.data.object.id,
      });

      const sessionId = session[0].id;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("payments")
        .update({ session_status: "complete" })
        .eq("session_id", sessionId)
        .select();

      console.log("data", data);
      if (error) {
        console.error(error);
        return new Response("Error updating payment status", { status: 500 });
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  return Response.json({ received: true });
}
