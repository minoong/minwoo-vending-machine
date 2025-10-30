import { handleDecreaseQuantity, handleIncreaseQuantity } from '~/providers/vending-machine/lib/cart-handlers';
import {
  handleAddMoreCash,
  handleCardPaymentFailed,
  handleCardPaymentSuccess,
  handleGoToProductSelection,
  handleInsertCash,
  handleProcessCardPayment,
  handleSelectPaymentMethod,
} from '~/providers/vending-machine/lib/payment-handlers';
import {
  handleCancelTransaction,
  handleCompletePurchase,
  handleCompleteTransaction,
  handleDispenseProduct,
  handleReturnChange,
} from '~/providers/vending-machine/lib/transaction-handlers';
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
    case '상품_선택_화면_이동':
      return handleGoToProductSelection(state);
    case '금액_추가':
      return handleAddMoreCash(state);
    case '카드_결제_처리_시작':
      return handleProcessCardPayment(state);
    case '신용카드_결제_성공':
      return handleCardPaymentSuccess(state);
    case '신용카드_결제_실패':
      return handleCardPaymentFailed(state);

    case '상품_수량_증가':
      return handleIncreaseQuantity(state, action);
    case '상품_수량_감소':
      return handleDecreaseQuantity(state, action);

    case '구매_완료_처리':
      return handleCompletePurchase(state);
    case '상품_출고':
      return handleDispenseProduct(state);
    case '거스름돈_반환':
      return handleReturnChange(state);
    case '거래_완료':
      return handleCompleteTransaction(state);
    case '거래_취소':
      return handleCancelTransaction(state);
  }

  return state;
};
