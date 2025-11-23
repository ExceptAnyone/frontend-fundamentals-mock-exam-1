import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from 'types/response';

interface SavingsProductRowProps {
  product: SavingsProduct;
  isSelected: boolean;
  onClick: (product: SavingsProduct) => void;
}

export function SavingsProductRow({ product, isSelected, onClick }: SavingsProductRowProps) {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={product.name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${product.annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      onClick={() => onClick(product)}
      right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
    />
  );
}
