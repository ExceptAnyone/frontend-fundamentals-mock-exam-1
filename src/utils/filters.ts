import { SavingsProduct } from 'types/response';

export interface ProductFilterCriteria {
  monthlyPayment: number;
  term: number;
}

export function isProductValid(product: SavingsProduct, criteria: ProductFilterCriteria): boolean {
  const { monthlyPayment, term } = criteria;
  return (
    monthlyPayment >= product.minMonthlyAmount &&
    monthlyPayment <= product.maxMonthlyAmount &&
    term === product.availableTerms
  );
}

export function filterValidProducts(products: SavingsProduct[], criteria: ProductFilterCriteria): SavingsProduct[] {
  return products.filter(product => isProductValid(product, criteria));
}

export function sortProductsByAnnualRate(products: SavingsProduct[]): SavingsProduct[] {
  return [...products].sort((a, b) => b.annualRate - a.annualRate);
}

export function filterAndSortProducts(products: SavingsProduct[], criteria: ProductFilterCriteria): SavingsProduct[] {
  const filtered = filterValidProducts(products, criteria);
  return sortProductsByAnnualRate(filtered);
}
