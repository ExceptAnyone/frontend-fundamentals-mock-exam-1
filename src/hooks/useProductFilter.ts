import { useMemo } from 'react';
import { SavingsProduct } from 'types/response';
import { MAX_RECOMMENDED_PRODUCTS_COUNT } from 'constants/savings';
import { filterAndSortProducts, filterValidProducts } from 'utils/filters';

interface ProductFilterStandard {
  monthlyPayment: number;
  term: number;
}

export function useProductFilter(products: SavingsProduct[], standard: ProductFilterStandard) {
  const validProducts = useMemo(() => filterValidProducts(products, standard), [products, standard]);

  const recommendedProducts = useMemo(
    () => filterAndSortProducts(products, standard).slice(0, MAX_RECOMMENDED_PRODUCTS_COUNT),
    [products, standard]
  );

  return {
    validProducts,
    recommendedProducts,
  };
}
