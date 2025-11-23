export const SAVINGS_TERM_OPTIONS = [6, 12, 24] as const;

export type SavingsTerm = (typeof SAVINGS_TERM_OPTIONS)[number];

export const SAVINGS_TERM_LABELS: Record<SavingsTerm, string> = {
  6: '6개월',
  12: '12개월',
  24: '24개월',
};

export const DEFAULT_SAVINGS_TERM: SavingsTerm = 12;

export const INTEREST_RATE_COEFFICIENT = 0.5;

export const RECOMMENDED_PAYMENT_ROUND_UNIT = 1000;

export const MAX_RECOMMENDED_PRODUCTS_COUNT = 2;
