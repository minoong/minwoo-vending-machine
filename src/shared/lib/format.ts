export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('ko-KR')}`;
};

export const formatCurrencyWithKRW = (amount: number): string => {
  return `₩ ${amount.toLocaleString('ko-KR')}`;
};
