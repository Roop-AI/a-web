import { useState } from "react";

export function useSubscriptionModal() {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const onSubscriptionOpen = () => setIsSubscriptionOpen(true);
  const onSubscriptionClose = () => setIsSubscriptionOpen(false);
  return { isSubscriptionOpen, onSubscriptionOpen, onSubscriptionClose };
}

export function usePaymentModal() {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const onCreditsOpen = () => setIsCreditsOpen(true);
  const onCreditsClose = () => setIsCreditsOpen(false);
  return { isCreditsOpen, onCreditsOpen, onCreditsClose };
}
