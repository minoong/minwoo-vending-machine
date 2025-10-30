import { useCallback } from 'react';
import { CashInserter } from '~/features/insert-cash/ui/cash-inserter';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import type { CashDenomination } from '~/shared/types';

export function CashInsertPage() {
  const { state, dispatch } = useVendingMachine();
  const {
    currentTransaction: { insertedAmount },
  } = state;

  const handleCashInsert = useCallback((amount: CashDenomination) => {
    dispatch({ type: '현금_투입', payload: amount });
  }, []);

  return <CashInserter currentBalance={insertedAmount} onInsert={handleCashInsert} />;
}
