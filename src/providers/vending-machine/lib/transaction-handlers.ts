import type { VendingMachineState } from '~/providers/vending-machine/types';
import { createInitialTransaction } from '~/shared/lib/transaction';

export const handleCompletePurchase = (state: VendingMachineState): VendingMachineState => {
  if (state.currentTransaction.cart.length === 0) {
    const product = state.products.find(({ id }) => id === state.currentTransaction.selectedProduct);

    if (!product) {
      return state;
    }

    const updatedProducts = state.products.map((product) => (product.id === product.id ? { ...product, stock: product.stock - 1 } : product));

    const change =
      state.currentTransaction.paymentMethod === '신용카드' ? state.currentTransaction.insertedAmount - state.currentTransaction.purchaseAmount : 0;

    return {
      ...state,
      products: updatedProducts,
      currentTransaction: {
        ...state.currentTransaction,
        changeAmount: change,
        status: '상품_출고_중',
      },
    };
  }

  let updatedProducts = state.products;
  for (const cartItem of state.currentTransaction.cart) {
    updatedProducts = updatedProducts.map((product) =>
      product.id === cartItem.productId ? { ...product, stock: product.stock - cartItem.quantity } : product,
    );
  }

  const change = state.currentTransaction.paymentMethod === '신용카드' ? state.currentTransaction.insertedAmount - state.currentTransaction.purchaseAmount : 0;

  return {
    ...state,
    products: updatedProducts,
    currentTransaction: {
      ...state.currentTransaction,
      changeAmount: change,
      status: '상품_출고_중',
    },
  };
};

export const handleDispenseProduct = (state: VendingMachineState): VendingMachineState => {
  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      status: state.currentTransaction.paymentMethod === '신용카드' ? '거스름돈_반환_중' : '거래_완료',
    },
  };
};

export const handleReturnChange = (state: VendingMachineState): VendingMachineState => {
  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      status: '거래_완료',
    },
  };
};

export const handleCompleteTransaction = (state: VendingMachineState): VendingMachineState => {
  return {
    ...state,
    currentTransaction: createInitialTransaction(),
  };
};

export const handleCancelTransaction = (state: VendingMachineState): VendingMachineState => {
  return {
    ...state,
    currentTransaction: {
      ...createInitialTransaction(),
      status: '거스름돈_반환_중',
      changeAmount: state.currentTransaction.insertedAmount,
    },
  };
};
