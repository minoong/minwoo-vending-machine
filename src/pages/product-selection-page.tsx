import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ProductSelector } from '~/features/select-product/ui/product-selector';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import type { ProductType } from '~/shared/types';

export function ProductSelectionPage() {
  const { state, dispatch } = useVendingMachine();
  const navigate = useNavigate();

  const { currentTransaction, products } = state;

  const handleIncreaseQuantity = useCallback((productId: ProductType) => {
    dispatch({ type: '상품_수량_증가', payload: productId });
  }, []);

  const handleDecreaseQuantity = useCallback((productId: ProductType) => {
    dispatch({ type: '상품_수량_감소', payload: productId });
  }, []);

  const handleAddMoreCash = useCallback(() => {
    dispatch({ type: '금액_추가' });
    navigate('/cash/insert');
  }, []);

  const handleCancel = useCallback(() => {
    if (currentTransaction.paymentMethod === '현금' && currentTransaction.insertedAmount > 0) {
      dispatch({ type: '거래_취소' });
      navigate('/returning');
    } else {
      dispatch({ type: '거래_완료' });
      navigate('/');
    }
  }, [currentTransaction]);

  return (
    <ProductSelector
      products={products}
      currentBalance={currentTransaction.insertedAmount}
      cart={currentTransaction.cart}
      totalAmount={currentTransaction.purchaseAmount}
      isCashPayment={currentTransaction.paymentMethod === '현금'}
      hasCardPaymentError={currentTransaction.error === '신용카드_인증_실패' && currentTransaction.paymentMethod === '신용카드'}
      onIncreaseQuantity={handleIncreaseQuantity}
      onDecreaseQuantity={handleDecreaseQuantity}
      onAddMoreCash={handleAddMoreCash}
      onPurchase={() => null}
      onCancel={handleCancel}
    />
  );
}
