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
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded" ||
    event.type === "payment_intent.succeeded"
  ) {
    const sessionId = event.data.object.id;
    console.log("sessionId", sessionId);
    const supabase = createClient();
    const { error } = await supabase.from("payments").update({ status: "completed" }).eq("session_id", sessionId);

    if (error) {
      console.error("Error updating payment status:", error);
      return new Response("Error updating payment status", { status: 500 });
    }
  }

  return Response.json({ received: true });
}
