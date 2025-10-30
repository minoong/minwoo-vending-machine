import { memo, useCallback } from 'react';
import { formatCurrency, formatCurrencyWithKRW } from '~/shared/lib/format';
import type { CartItem, Product, ProductType } from '~/shared/types';

interface ProductSelectorProps {
  products: Product[];
  currentBalance: number;
  cart: CartItem[];
  totalAmount: number;
  isCashPayment?: boolean;
  hasCardPaymentError?: boolean;
  onIncreaseQuantity: (productId: ProductType) => void;
  onDecreaseQuantity: (productId: ProductType) => void;
  onAddMoreCash?: () => void;
  onPurchase: () => void;
  onCancel: () => void;
}

function ProductSelectorComponent(props: ProductSelectorProps) {
  const {
    products,
    currentBalance,
    cart,
    totalAmount,
    isCashPayment,
    hasCardPaymentError,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onAddMoreCash,
    onPurchase,
    onCancel,
  } = props;

  const getCartQuantity = useCallback(
    (productId: ProductType): number => {
      const item = cart.find((item) => item.productId === productId);

      return item ? item.quantity : 0;
    },
    [cart],
  );

  const canIncrease = useCallback(
    (product: Product): boolean => {
      const currentQuantity = getCartQuantity(product.id);
      const wouldExceedStock = currentQuantity >= product.stock;
      const wouldExceedBalance = totalAmount + product.price > currentBalance;

      return !wouldExceedStock && !wouldExceedBalance;
    },
    [getCartQuantity, totalAmount, currentBalance],
  );

  return (
    <div className="rounded-lg bg-white p-3 shadow-lg">
      <h2 className="mb-4 animate-bounce text-center text-2xl font-bold text-gray-800">음료를 선택하세요.</h2>

      <div className="mb-4 grid grid-cols-1 gap-4">
        {products.map((product) => {
          const quantity = getCartQuantity(product.id);
          const isOutOfStock = product.stock === 0;
          const canAdd = canIncrease(product);

          return (
            <div key={product.id} className={`rounded-lg border-2 p-4 ${quantity > 0 ? 'border-amber-500 bg-amber-50' : 'border-gray-300 bg-white'}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex-1 text-left">
                  <div className="text-xl font-bold text-gray-800">{product.name}</div>
                  <div className="text-lg text-gray-600">{formatCurrencyWithKRW(product.price)}</div>
                </div>
                <div className="text-right">
                  {isOutOfStock ? (
                    <span className="font-bold text-red-500">품절</span>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-500">재고</div>
                      <div className="text-lg font-bold text-gray-700">{product.stock} 개</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onDecreaseQuantity(product.id)}
                    disabled={quantity === 0}
                    className={`h-10 w-10 rounded-lg text-xl font-bold ${
                      quantity > 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'cursor-not-allowed bg-gray-200 text-gray-400'
                    }`}
                  >
                    ➖
                  </button>
                  <div className="w-12 text-center">
                    <div className="text-2xl font-bold text-gray-800">{formatCurrency(quantity)}</div>
                  </div>
                  <button
                    onClick={() => onIncreaseQuantity(product.id)}
                    disabled={!canAdd || isOutOfStock}
                    className={`h-10 w-10 rounded-lg text-xl font-bold ${
                      canAdd && !isOutOfStock ? 'bg-amber-500 text-white hover:bg-amber-600' : 'cursor-not-allowed bg-gray-200 text-gray-400'
                    }`}
                  >
                    ➕
                  </button>
                </div>
                {quantity > 0 && (
                  <div className="text-right">
                    <div className="text-sm text-gray-500">소계</div>
                    <div className="text-lg font-bold text-blue-600">{formatCurrencyWithKRW(product.price * quantity)}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg bg-gray-100 p-4">
        <div className="flex items-center justify-between text-right">
          {isCashPayment ? (
            <>
              <div>
                <div className="text-sm text-gray-600">투입 금액</div>
                <div className="text-xl font-bold text-amber-600">{formatCurrencyWithKRW(currentBalance)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">잔액</div>
                <div className="text-xl font-bold text-red-600">{formatCurrencyWithKRW(currentBalance - totalAmount)}</div>
              </div>
            </>
          ) : (
            <div className="w-full text-center">
              <div className="mb-1 text-sm text-gray-600">결제 예정 금액</div>
              <div className="text-2xl font-bold text-blue-600">{formatCurrencyWithKRW(totalAmount)}</div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {hasCardPaymentError && (
          <div className="rounded-lg border-2 border-red-500 bg-red-100 p-3 text-center">
            <p className="mb-2 font-bold text-red-700">카드 결제에 실패했습니다</p>
            <p className="text-sm text-red-600">다시 시도하시겠습니까?</p>
          </div>
        )}

        <button
          onClick={onPurchase}
          disabled={cart.length === 0}
          className={`w-full rounded-lg px-4 py-3 font-bold transition-colors duration-200 ${
            cart.length > 0
              ? hasCardPaymentError
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-amber-500 text-white hover:bg-amber-600'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          {cart.length > 0
            ? hasCardPaymentError
              ? `재시도 (${formatCurrencyWithKRW(totalAmount)})`
              : isCashPayment
                ? `구매하기 (${formatCurrencyWithKRW(totalAmount)})`
                : `카드 결제 (${formatCurrencyWithKRW(totalAmount)})`
            : '음료를 장바구니에 담아주세요.'}
        </button>
        {isCashPayment && onAddMoreCash && (
          <button
            onClick={onAddMoreCash}
            className="w-full rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-600"
          >
            금액 추가하기
          </button>
        )}
        <button onClick={onCancel} className="w-full rounded-lg bg-red-500 px-4 py-3 font-bold text-white transition-colors duration-200 hover:bg-red-600">
          취소
        </button>
      </div>
    </div>
  );
}

ProductSelectorComponent.displayName = 'ProductSelector';

export const ProductSelector = memo(ProductSelectorComponent);
