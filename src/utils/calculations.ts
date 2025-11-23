import { INTEREST_RATE_COEFFICIENT, RECOMMENDED_PAYMENT_ROUND_UNIT } from 'constants/savings';

export interface SavingsCalculationParams {
  monthlyPayment: number;
  term: number;
  annualRate: number;
}

export function calculateExpectedProfit(params: SavingsCalculationParams): number {
  const { monthlyPayment, term, annualRate } = params;
  return monthlyPayment * term * (1 + annualRate * INTEREST_RATE_COEFFICIENT);
}

export function calculateExpectedProfitDifference(targetAmount: number, expectedProfit: number): number {
  return targetAmount - expectedProfit;
}

export function calculateRecommendedMonthlyPayment(
  params: Omit<SavingsCalculationParams, 'monthlyPayment'>,
  targetAmount: number
): number {
  const { term, annualRate } = params;
  const denominator = term * (1 + annualRate * INTEREST_RATE_COEFFICIENT);
  const recommendedAmount = targetAmount / denominator;
  return Math.round(recommendedAmount / RECOMMENDED_PAYMENT_ROUND_UNIT) * RECOMMENDED_PAYMENT_ROUND_UNIT;
}
