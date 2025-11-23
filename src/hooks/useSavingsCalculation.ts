import { useMemo } from 'react';
import { SavingsProduct } from 'types/response';
import {
  calculateExpectedProfit,
  calculateExpectedProfitDifference,
  calculateRecommendedMonthlyPayment,
} from 'utils/calculations';

interface UseSavingsCalculationParams {
  selectedProduct: SavingsProduct | null;
  monthlyPayment: number;
  term: number;
  targetAmount: number;
}

export function useSavingsCalculation({
  selectedProduct,
  monthlyPayment,
  term,
  targetAmount,
}: UseSavingsCalculationParams) {
  const calculationResults = useMemo(() => {
    if (!selectedProduct) {
      return null;
    }

    const expectedProfit = calculateExpectedProfit({
      monthlyPayment,
      term,
      annualRate: selectedProduct.annualRate,
    });
    const profitDifference = calculateExpectedProfitDifference(targetAmount, expectedProfit);
    const recommendedPayment = calculateRecommendedMonthlyPayment(
      {
        term,
        annualRate: selectedProduct.annualRate,
      },
      targetAmount
    );

    return {
      expectedProfit,
      profitDifference,
      recommendedPayment,
    };
  }, [selectedProduct, monthlyPayment, term, targetAmount]);

  return calculationResults;
}
