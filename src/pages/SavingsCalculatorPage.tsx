import { Border, ListHeader, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProduct } from 'types/response';
import { TabType } from 'types/tab';
import { CalculationResult } from 'components/CalculationResult';
import { InputForm } from 'components/InputForm';
import { SavingsProductList } from 'components/SavingsProductList';
import { useFormInput } from 'hooks/useFormInput';
import { useProductFilter } from 'hooks/useProductFilter';
import { useSavingsCalculation } from 'hooks/useSavingsCalculation';
import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { useState, useCallback } from 'react';
import { filterValidProducts } from 'utils/filters';

export function SavingsCalculatorPage() {
  const { savingsProducts, setSavingsProducts } = useSavingsProducts();
  const { formState, handleTargetAmountChange, handleMonthlyPaymentChange, handleSelectedTermChange } = useFormInput();
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);
  const [tab, setTab] = useState<TabType>('products');

  const { validProducts, recommendedProducts } = useProductFilter(savingsProducts, {
    monthlyPayment: formState.monthlyPayment,
    term: formState.selectedTerm,
  });

  const calculationResults = useSavingsCalculation({
    selectedProduct,
    monthlyPayment: formState.monthlyPayment,
    term: formState.selectedTerm,
    targetAmount: formState.targetAmount,
  });

  const handleSelectProduct = useCallback((product: SavingsProduct) => {
    setSelectedProduct(product);
  }, []);

  const handleTabChange = useCallback(
    (value: string) => {
      if (value === 'products') {
        setTab('products');
      } else {
        setTab('results');
        const filteredProducts = filterValidProducts(savingsProducts, {
          monthlyPayment: formState.monthlyPayment,
          term: formState.selectedTerm,
        });
        setSavingsProducts(filteredProducts);
        if (!selectedProduct) {
          setSelectedProduct(null);
        }
      }
    },
    [savingsProducts, formState.monthlyPayment, formState.selectedTerm, selectedProduct, setSavingsProducts]
  );

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <InputForm
        targetAmount={formState.targetAmount}
        monthlyPayment={formState.monthlyPayment}
        selectedTerm={formState.selectedTerm}
        onTargetAmountChange={handleTargetAmountChange}
        onMonthlyPaymentChange={handleMonthlyPaymentChange}
        onSelectedTermChange={handleSelectedTermChange}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={handleTabChange}>
        <Tab.Item value="products" selected={tab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={tab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {tab === 'products' && (
        <SavingsProductList
          products={validProducts}
          selectedProductId={selectedProduct?.id ?? null}
          onSelectProduct={handleSelectProduct}
        />
      )}

      <Spacing size={8} />

      {calculationResults ? (
        <CalculationResult
          expectedProfit={calculationResults.expectedProfit}
          profitDifference={calculationResults.profitDifference}
          recommendedPayment={calculationResults.recommendedPayment}
        />
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <SavingsProductList
        products={recommendedProducts}
        selectedProductId={selectedProduct?.id ?? null}
        onSelectProduct={handleSelectProduct}
      />

      <Spacing size={40} />
    </>
  );
}
