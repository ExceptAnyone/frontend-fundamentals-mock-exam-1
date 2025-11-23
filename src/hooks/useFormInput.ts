import { DEFAULT_SAVINGS_TERM, SavingsTerm } from 'constants/savings';
import { useState, useCallback } from 'react';

interface FormInputState {
  targetAmount: number;
  monthlyPayment: number;
  selectedTerm: SavingsTerm;
}

export function useFormInput(initialState?: Partial<FormInputState>) {
  const [formState, setFormState] = useState<FormInputState>({
    targetAmount: initialState?.targetAmount ?? 0,
    monthlyPayment: initialState?.monthlyPayment ?? 0,
    selectedTerm: initialState?.selectedTerm ?? (DEFAULT_SAVINGS_TERM as SavingsTerm),
  });

  const handleTargetAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/,/g, ''));
    setFormState(prev => ({ ...prev, targetAmount: value }));
  }, []);

  const handleMonthlyPaymentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/,/g, ''));
    setFormState(prev => ({ ...prev, monthlyPayment: value }));
  }, []);

  const handleSelectedTermChange = useCallback((value: SavingsTerm) => {
    setFormState(prev => ({ ...prev, selectedTerm: value }));
  }, []);

  return {
    formState,
    setFormState,
    handleTargetAmountChange,
    handleMonthlyPaymentChange,
    handleSelectedTermChange,
  };
}
