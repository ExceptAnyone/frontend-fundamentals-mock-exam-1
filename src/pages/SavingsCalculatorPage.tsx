import { getSavingsProducts } from 'apis/savingProducts';
import { useEffect, useState } from 'react';
import {
  Assets,
  Border,
  colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { SavingsProduct } from 'types/response';

export function SavingsCalculatorPage() {
  const [savingsProducts, setSavingsProducts] = useState<SavingsProduct[]>([]);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [selectedTerm, setSelectedTerm] = useState<number>(12);
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null); //TODO 얘는 파생상태인디?
  const [tab, setTab] = useState<'products' | 'results'>('products');

  const fetchSavingsProducts = async () => {
    const response = await getSavingsProducts();
    setSavingsProducts(response);
  };

  useEffect(() => {
    fetchSavingsProducts();
  }, []);

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetAmount(Number(e.target.value.replace(/,/g, '')));
    console.log(targetAmount);
    //TODO string 입력 시 입력 안되게 해야함.
  };

  const handleMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyPayment(Number(e.target.value.replace(/,/g, '')));
  };

  const handleSelectedTermChange = (value: number) => {
    setSelectedTerm(value);
  };

  const handleSelectProduct = (product: SavingsProduct) => {
    setSelectedProduct(product);
  };

  const isProductValid = (product: SavingsProduct) => {
    return (
      monthlyPayment >= product.minMonthlyAmount &&
      monthlyPayment <= product.maxMonthlyAmount &&
      selectedTerm === product.availableTerms
    );
  };

  const handleTabChange = (value: string) => {
    if (value === 'products') {
      setTab('products');
    } else {
      setTab('results');
      setSavingsProducts(savingsProducts.filter(isProductValid));
      if (!selectedProduct) {
        setSelectedProduct(null);
      }
    }
  };

  //   - 예상 수익 금액
  //   - 공식: `최종 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)`
  // - 목표 금액과의 차이
  //   - 공식: `목표 금액과의 차이 = 목표 금액 - 예상 수익 금액`
  // - 추천 월 납입 금액
  //   - 공식: `월 납입액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))`
  //   - 1,000원 단위로 반올림

  // 만약 사용자가 적금 상품을 선택하지 않았다면 “상품을 선택해주세요”를 출력해주세요.

  const calculateExpectedProfit = (product: SavingsProduct) => {
    return Math.round(monthlyPayment * selectedTerm * (1 + product.annualRate * 0.5));
  };

  const calculateExpectedProfitDifference = (product: SavingsProduct) => {
    return targetAmount - calculateExpectedProfit(product);
  };

  const calculateRecommendedMonthlyPayment = (product: SavingsProduct) => {
    return Math.round(targetAmount / (selectedTerm * (1 + product.annualRate * 0.5)) / 1000) * 1000;
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmount.toLocaleString()}
        onChange={handleTargetAmountChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyPayment.toLocaleString()}
        onChange={handleMonthlyPaymentChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={selectedTerm}
        onChange={handleSelectedTermChange}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

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

      {tab === 'products' &&
        savingsProducts.filter(isProductValid).map(product => (
          <ListRow
            key={product.id}
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
            onClick={() => {
              handleSelectProduct(product);
            }}
            right={selectedProduct?.id === product.id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
          />
        ))}

      {/* 아래는 계산 결과 탭 내용이에요. 계산 결과 탭을 구현할 때 주석을 해제해주세요.  */}
      <Spacing size={8} />

      {selectedProduct ? (
        <>
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="예상 수익 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`${calculateExpectedProfit(selectedProduct).toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="목표 금액과의 차이"
                topProps={{ color: colors.grey600 }}
                bottom={`${calculateExpectedProfitDifference(selectedProduct).toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="추천 월 납입 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`${calculateRecommendedMonthlyPayment(selectedProduct).toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
        </>
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {savingsProducts
        .filter(isProductValid)
        .sort((a, b) => b.annualRate - a.annualRate)
        .slice(0, 2)
        .map(product => (
          <ListRow
            key={product.id}
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
            onClick={() => {
              handleSelectProduct(product);
            }}
            right={selectedProduct?.id === product.id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
          />
        ))}

      <Spacing size={40} />
    </>
  );
}
