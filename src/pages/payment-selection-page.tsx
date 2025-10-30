import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { PaymentSelector } from '~/features/select-payment/ui/payment-selector';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import type { PaymentMethod } from '~/shared/types';

export function PaymentSelectionPage() {
  const { state, dispatch } = useVendingMachine();
  const navigate = useNavigate();

  const { products } = state;

  const handlePaymentSelect = useCallback((method: PaymentMethod) => {
    dispatch({ type: '결제_수단_선택', payload: method });

    if (method === '현금') {
      navigate('/cash/insert');
    } else {
      navigate('/product');
    }
  }, []);

  return <PaymentSelector products={products} onSelect={handlePaymentSelect} />;
}
