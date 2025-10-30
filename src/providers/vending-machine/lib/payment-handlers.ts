import type { VendingMachineAction, VendingMachineState } from '~/providers/vending-machine/types';

export const handleSelectPaymentMethod = (
  state: VendingMachineState,
  action: Extract<VendingMachineAction, { type: '결제_수단_선택' }>,
): VendingMachineState => {
  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      paymentMethod: action.payload,
      status: action.payload === '현금' ? '현금_투입_중' : '상품_선택_중',
      insertedAmount: action.payload === '신용카드' ? Infinity : 0,
    },
  };
};

export const handleInsertCash = (state: VendingMachineState, action: Extract<VendingMachineAction, { type: '현금_투입' }>): VendingMachineState => {
  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      insertedAmount: state.currentTransaction.insertedAmount + action.payload,
    },
  };
};

export const handleGoToProductSelection = (state: VendingMachineState): VendingMachineState => {
  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      status: '상품_선택_중',
    },
  };
};
