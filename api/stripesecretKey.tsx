export async function FetchStripeSecretKey(): Promise<{
    stripeSecretKey: string;
  }> {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
    if (!stripeSecretKey) {
      throw new Error("Stripe secret key not found");
    }
  
    return {
      stripeSecretKey,
    };
  }
  