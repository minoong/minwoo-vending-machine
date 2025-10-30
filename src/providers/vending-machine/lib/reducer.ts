import { handleDecreaseQuantity, handleIncreaseQuantity } from '~/providers/vending-machine/lib/cart-handlers';
import { handleAddMoreCash, handleGoToProductSelection, handleInsertCash, handleSelectPaymentMethod } from '~/providers/vending-machine/lib/payment-handlers';
import { handleCancelTransaction, handleCompleteTransaction } from '~/providers/vending-machine/lib/transaction-handlers';
import type { VendingMachineAction, VendingMachineState } from '~/providers/vending-machine/types';
import { INITIAL_PRODUCTS } from '~/shared/lib/products';
import { createInitialTransaction } from '~/shared/lib/transaction';

export const initialState: VendingMachineState = {
  products: INITIAL_PRODUCTS,
  currentTransaction: createInitialTransaction(),
};

export const vendingMachineReducer = (state: VendingMachineState, action: VendingMachineAction): VendingMachineState => {
  // TODO: Implement reducer logic here
  console.log('Current state:', state);
  console.log('Action dispatched:', action);

  switch (action.type) {
    case '결제_수단_선택':
      return handleSelectPaymentMethod(state, action);
    case '현금_투입':
      return handleInsertCash(state, action);
    case '거래_취소':
      return handleCancelTransaction(state);
    case '거래_완료':
      return handleCompleteTransaction(state);
    case '상품_선택_화면_이동':
      return handleGoToProductSelection(state);
    case '금액_추가':
      return handleAddMoreCash(state);
    case '상품_수량_증가':
      return handleIncreaseQuantity(state, action);
    case '상품_수량_감소':
      return handleDecreaseQuantity(state, action);
  }

  return state;
};
