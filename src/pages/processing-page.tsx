import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useVendingMachine } from '~/providers/vending-machine/hooks/use-vending-machine';
import { LoadingSpinner } from '~/shared/ui/loading-spinner';

export function ProcessingPage() {
  const { state, dispatch } = useVendingMachine();
  const { currentTransaction } = state;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timer: number;

    if (location.pathname === '/processing') {
      if (currentTransaction.selectedProduct && currentTransaction.cart.length === 0) {
        timer = setTimeout(() => {
          dispatch({ type: '구매_완료_처리' });
          navigate('/dispensing');
        }, 500);
      }
    } else if (location.pathname === '/dispensing') {
      timer = setTimeout(() => {
        dispatch({ type: '상품_출고' });

        if (currentTransaction.paymentMethod === '현금') {
          navigate('/returning');
        } else {
          navigate('/completed');
        }
      }, 1500);
    } else if (location.pathname === '/returning') {
      timer = setTimeout(() => {
        dispatch({ type: '거스름돈_반환' });
        navigate('/completed');
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [location.pathname, currentTransaction.selectedProduct, currentTransaction.cart.length, currentTransaction.paymentMethod, dispatch, navigate]);

  const getMessage = () => {
    if (location.pathname === '/dispensing') {
      return '음료 출고 중...';
    } else if (location.pathname === '/returning') {
      return '거스름돈 반환 중...';
    } else {
      return '구매 처리 중...';
    }
  };

  return <LoadingSpinner message={getMessage()} />;
}
