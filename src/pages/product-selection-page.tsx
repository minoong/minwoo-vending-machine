import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ProductSelector } from '~/features/select-product/ui/product-selector';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import { processCardPayment } from '~/shared/lib/payment';
import { LoadingSpinner } from '~/shared/ui/loading-spinner';
import type { ProductType } from '~/shared/types';

export function ProductSelectionPage() {
  const { state, dispatch } = useVendingMachine();
  const navigate = useNavigate();
  const isProcessingRef = useRef(false);

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

  const handlePurchase = useCallback(async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    if (currentTransaction.paymentMethod === '신용카드') {
      dispatch({ type: '카드_결제_처리_시작' });

      try {
        const success = await processCardPayment();
        if (success) {
          dispatch({ type: '신용카드_결제_성공' });
          dispatch({ type: '구매_완료_처리' });
        } else {
          dispatch({ type: '신용카드_결제_실패' });
          isProcessingRef.current = false;
        }
      } catch {
        dispatch({ type: '신용카드_결제_실패' });
        isProcessingRef.current = false;
      }
    } else {
      dispatch({ type: '구매_완료_처리' });
    }
  }, [currentTransaction.paymentMethod, dispatch]);

  useEffect(() => {
    const status = currentTransaction.status;

    if (status === '상품_출고_중') {
      navigate('/dispensing');
    }
  }, [currentTransaction, navigate]);

  const isCardProcessing = currentTransaction.status === '신용카드_처리_중';

  return (
    <>
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
        onPurchase={handlePurchase}
        onCancel={handleCancel}
      />
      {isCardProcessing && <LoadingSpinner message="카드 결제 처리 중" />}
    </>
  );
}
