import { SAVINGS_TERM_LABELS, SAVINGS_TERM_OPTIONS } from 'constants/savings';
import { SelectBottomSheet, Spacing, TextField } from 'tosslib';

interface InputFormProps {
  targetAmount: number;
  monthlyPayment: number;
  selectedTerm: number;
  onTargetAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMonthlyPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectedTermChange: (value: number) => void;
}

export function InputForm({
  targetAmount,
  monthlyPayment,
  selectedTerm,
  onTargetAmountChange,
  onMonthlyPaymentChange,
  onSelectedTermChange,
}: InputFormProps) {
  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmount.toLocaleString()}
        onChange={onTargetAmountChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyPayment.toLocaleString()}
        onChange={onMonthlyPaymentChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={selectedTerm}
        onChange={onSelectedTermChange}
      >
        {SAVINGS_TERM_OPTIONS.map(term => (
          <SelectBottomSheet.Option key={term} value={term}>
            {SAVINGS_TERM_LABELS[term]}
          </SelectBottomSheet.Option>
        ))}
      </SelectBottomSheet>
    </>
  );
}
