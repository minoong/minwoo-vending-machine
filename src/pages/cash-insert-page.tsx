import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { CashInserter } from '~/features/insert-cash/ui/cash-inserter';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import type { CashDenomination } from '~/shared/types';

export function CashInsertPage() {
  const { state, dispatch } = useVendingMachine();
  const navigate = useNavigate();

  const {
    products,
    currentTransaction: { insertedAmount },
  } = state;

  const minPrice = Math.min(...products.map((product) => product.price));
  const canSelectProduct = insertedAmount >= minPrice;

  const handleCashInsert = useCallback((amount: CashDenomination) => {
    dispatch({ type: '현금_투입', payload: amount });
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: '거래_취소' });
    navigate('/returning');
  }, []);

  const handleGoToProductSelection = useCallback(() => {
    dispatch({ type: '상품_선택_화면_이동' });
    navigate('/product');
  }, []);

  return (
    <CashInserter
      currentBalance={insertedAmount}
      minPrice={minPrice}
      canSelectProduct={canSelectProduct}
      onInsert={handleCashInsert}
      onGoToProductSelection={handleGoToProductSelection}
      onCancel={handleCancel}
    />
  );
}
