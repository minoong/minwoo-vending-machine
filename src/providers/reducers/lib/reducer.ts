import type { VendingMachineAction, VendingMachineState } from '~/providers/reducers/types';
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

  return state;
};
