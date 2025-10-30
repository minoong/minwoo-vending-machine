import { useNavigate } from 'react-router';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import { CompletionMessage } from '~/shared/ui/completion-message';

export function CompletionPage() {
  const { state, dispatch } = useVendingMachine();
  const { currentTransaction, products } = state;
  const navigate = useNavigate();

  const handleTransactionComplete = () => {
    dispatch({ type: '거래_완료' });
    navigate('/');
  };

  const selectedProduct = currentTransaction.selectedProduct ? products.find((p) => p.id === currentTransaction.selectedProduct) : null;

  const getCartProductNames = (): string => {
    if (currentTransaction.cart.length === 0) return '';
    return currentTransaction.cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? `${product.name} x${item.quantity}` : '';
      })
      .filter((name) => name)
      .join(', ');
  };

  const isCancelled = !selectedProduct && currentTransaction.cart.length === 0;

  return (
    <CompletionMessage
      productName={isCancelled ? '거래가 취소되었습니다' : currentTransaction.cart.length > 0 ? getCartProductNames() : selectedProduct?.name || ''}
      changeAmount={currentTransaction.paymentMethod === '현금' ? currentTransaction.changeAmount : undefined}
      onComplete={handleTransactionComplete}
    />
  );
}
