"use server";

import { getUser, updateUserSubscription } from "./server-actions";
import { stripe } from "@/lib/stripe";
import { getTier } from "@/app/(Layout)/(Products)/ai/product";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function createStripeSession(priceId: string, isYearly: boolean) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const tier = getTier("stripe-package");
    if (!tier || !tier.yearlyPrice || !tier.monthlyPrice) throw new Error("Invalid pricing tier");

    let customerId = user.stripe_customer_id;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      
      const supabase = await createClient();
      await supabase
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('id', user.id);
      
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: tier.title,
              description: tier.description,
              images: ["https://compclarity.com/assets/logo.png"],
              metadata: {
                company: "CompClarity",
              },
            },
            unit_amount: isYearly ? tier.yearlyPrice * 100 : tier.monthlyPrice * 100,
            recurring: {
              interval: isYearly ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      custom_text: {
        submit: {
          message: "CompClarity will process your subscription and provide immediate access to premium features.",
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/ai?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/ai?canceled=true`,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
    });

    if (!session.url) {
      throw new Error("Failed to create session");
    }

    return { url: session.url };
  } catch (error) {
    console.error("Error creating stripe session:", error);
    throw error;
  }
}

export const handleSubscriptionChange = async (subscription: Stripe.Subscription) => {
  const customerId = subscription.customer as string;
  const status = subscription.status;

  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  if (status === "active") {
    await updateUserSubscription(user.id, customerId, true);
  } else if (status === "canceled" || status === "unpaid") {
    await updateUserSubscription(user.id, null, false);
  }
};

export const updateUserSubscriptionBySessionId = async (userId: string, sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["customer", "subscription"],
  });

  if (!session.customer || typeof session.customer === "string") {
    throw new Error("Invalid customer data from Stripe.");
  }

  const customerId = session.customer.id;
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  if (!subscriptionId) {
    throw new Error('No subscription found for this session.');
  }
  await updateUserSubscription(userId, customerId, true);
};

export async function manageSubscription() {
  const user = await getUser();
  if (!user || !user.stripe_customer_id) {
    throw new Error("User not found or no subscription");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_API_URL}/account`,
  });

  return { url: session.url };
}
