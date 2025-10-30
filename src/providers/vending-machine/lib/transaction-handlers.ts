import type { VendingMachineState } from '~/providers/vending-machine/types';
import { createInitialTransaction } from '~/shared/lib/transaction';

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
