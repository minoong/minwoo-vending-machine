import type { Transaction } from '~/shared/types';

const generateTransactionId = (): string => {
  return `TransactionId-${Date.now()}`;
};

export const createInitialTransaction = (): Transaction => {
  return {
    id: generateTransactionId(),
    paymentMethod: null,
    insertedAmount: 0,
    purchaseAmount: 0,
    changeAmount: 0,
    selectedProduct: null,
    cart: [],
    status: '대기_상태',
    error: null,
    timestamp: Date.now(),
  };
};
