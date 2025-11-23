import { ListRow } from 'tosslib';
import { SavingsProduct } from 'types/response';
import { SavingsProductRow } from './SavingsProductRow';

interface SavingsProductListProps {
  products: SavingsProduct[];
  selectedProductId: string | null;
  onSelectProduct: (product: SavingsProduct) => void;
  emptyMessage?: string;
}

export function SavingsProductList({
  products,
  selectedProductId,
  onSelectProduct,
  emptyMessage,
}: SavingsProductListProps) {
  if (products.length === 0 && emptyMessage) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top={emptyMessage} />} />;
  }

  return (
    <>
      {products.map(product => (
        <SavingsProductRow
          key={product.id}
          product={product}
          isSelected={selectedProductId === product.id}
          onClick={onSelectProduct}
        />
      ))}
    </>
  );
}
