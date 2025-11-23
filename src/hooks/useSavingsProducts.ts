import { getSavingsProducts } from 'apis/savingProducts';
import { useEffect, useState } from 'react';
import { SavingsProduct } from 'types/response';

export function useSavingsProducts() {
  const [savingsProducts, setSavingsProducts] = useState<SavingsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSavingsProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getSavingsProducts();
      setSavingsProducts(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('상품 목록을 불러오는데 실패했습니다.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavingsProducts();
  }, []);

  return {
    savingsProducts,
    setSavingsProducts,
    isLoading,
    error,
    refetch: fetchSavingsProducts,
  };
}
