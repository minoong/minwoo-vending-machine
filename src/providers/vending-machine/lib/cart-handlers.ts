import type { VendingMachineAction, VendingMachineState } from '~/providers/vending-machine/types';

export const handleIncreaseQuantity = (state: VendingMachineState, action: Extract<VendingMachineAction, { type: '상품_수량_증가' }>): VendingMachineState => {
  const product = state.products.find(({ id }) => id === action.payload);

  if (!product) {
    return state;
  }

  const existingItem = state.currentTransaction.cart.find(({ productId }) => productId === action.payload);
  const currentQuantity = existingItem ? existingItem.quantity : 0;

  if (currentQuantity >= product.stock) {
    return {
      ...state,
      currentTransaction: {
        ...state.currentTransaction,
        error: '재고_없음',
      },
    };
  }

  const newCart = existingItem
    ? state.currentTransaction.cart.map((item) => (item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item))
    : [...state.currentTransaction.cart, { productId: action.payload, quantity: 1 }];

  const totalAmount = newCart.reduce((sum, item) => {
    const product = state.products.find(({ id }) => id === item.productId);

    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  if (totalAmount > state.currentTransaction.insertedAmount) {
    return {
      ...state,
      currentTransaction: {
        ...state.currentTransaction,
        error: '잔액_부족',
      },
    };
  }

  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      cart: newCart,
      purchaseAmount: totalAmount,
      error: null,
    },
  };
};

export const handleDecreaseQuantity = (state: VendingMachineState, action: Extract<VendingMachineAction, { type: '상품_수량_감소' }>): VendingMachineState => {
  const existingItem = state.currentTransaction.cart.find(({ productId }) => productId === action.payload);

  if (!existingItem || existingItem.quantity <= 0) {
    return state;
  }

  const newCart =
    existingItem.quantity === 1
      ? state.currentTransaction.cart.filter(({ productId }) => productId !== action.payload)
      : state.currentTransaction.cart.map((item) => (item.productId === action.payload ? { ...item, quantity: item.quantity - 1 } : item));

  const totalAmount = newCart.reduce((sum, item) => {
    const product = state.products.find(({ id }) => id === item.productId);

    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return {
    ...state,
    currentTransaction: {
      ...state.currentTransaction,
      cart: newCart,
      purchaseAmount: totalAmount,
    },
  };
};
