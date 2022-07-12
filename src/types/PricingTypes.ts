import React from 'react';
import Stripe from 'stripe';

export type ProductWithPrice = Stripe.Product & { price: Stripe.Price };
export type CardType = { plan: ProductWithPrice; numPlans?: number; children?: React.ReactNode };
export type SummaryItemType = { excerpt: string };
