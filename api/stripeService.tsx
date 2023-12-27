import { Stripe } from "stripe";
import { FetchStripeSecretKey } from "./stripesecretKey";

export async function getStripeCustomers() {
  try {
    const { stripeSecretKey } = await FetchStripeSecretKey();
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const customers = await stripe.customers.list();
    return customers.data;
  } catch (error) {
    // Handle errors, e.g., log or gracefully return an empty array
    console.error("Failed to fetch Stripe customers:", error);
    return [];
  }
}

export async function getStripePaymentIntents() {
  try {
    const { stripeSecretKey } = await FetchStripeSecretKey();
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const paymentIntents = await stripe.paymentIntents.list();
    return paymentIntents.data;
  } catch (error) {
    // Handle errors, e.g., log or throw an error
    console.error("Failed to fetch Stripe payment intents:", error);
    return [];
  }
}

export async function getStripeSubscription(customerId: string) {
  try {
    const { stripeSecretKey } = await FetchStripeSecretKey();
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    });

    console.log(JSON.stringify(subscriptions), "subscription");
    return subscriptions; // Return the subscriptions data
  } catch (error) {
    // Handle errors, e.g., log or throw an error
    console.error("Failed to fetch Stripe subscriptions:", error);
    return [];
  }
}

export async function getStripeProductPriceData() {
  try {
    const { stripeSecretKey } = await FetchStripeSecretKey();
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const productPriceData = await stripe.prices.list({
      expand: ["data.product"],
      limit: 100,
    });

    return productPriceData;
  } catch (error) {
    // Handle errors, e.g., log or throw an error
    console.error("Failed to fetch Stripe product prices:", error);
    return [];
  }
}
