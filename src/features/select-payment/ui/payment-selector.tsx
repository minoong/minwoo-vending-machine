import { memo } from 'react';
import { formatCurrency, formatCurrencyWithKRW } from '~/shared/lib/format';
import type { PaymentMethod, Product } from '~/shared/types';

interface PaymentSelectorProps {
  products: Product[];
  onSelect: (method: PaymentMethod) => void;
}

function PaymentSelectorComponent(props: PaymentSelectorProps) {
  const { products, onSelect } = props;

  return (
    <div className="rounded-lg bg-white p-3 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">환영합니다.</h2>

      <div className="mb-6">
        <h3 className="mb-3 rotate-6 text-center text-lg font-semibold text-gray-700">판매 음료</h3>
        <div className="grid grid-cols-3 gap-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg border-2 border-amber-500 p-2">
              <div className="text-center">
                <div className="mb-1 text-lg font-bold text-gray-800">{product.name}</div>
                <div className="text-md mb-1 font-semibold text-amber-600">{formatCurrencyWithKRW(product.price)}</div>
                <div className="text-xs text-gray-600">
                  {product.stock > 0 ? (
                    <span className="font-medium text-gray-600">재고 {formatCurrency(product.stock)} 개</span>
                  ) : (
                    <span className="font-bold text-red-500">품절</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-6">
        <h3 className="mb-4 animate-bounce text-center text-lg font-semibold text-gray-700">결제 방식을 선택하세요.</h3>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onSelect('현금')}
            className="flex-1 rounded-lg bg-amber-600 px-3 py-4 text-xl font-bold text-white transition duration-200 hover:bg-amber-700 active:scale-95"
          >
            현금 결제
          </button>
          <button
            type="button"
            onClick={() => onSelect('신용카드')}
            className="flex-1 rounded-lg bg-amber-600 px-3 py-4 text-xl font-bold text-white transition duration-200 hover:bg-amber-700 active:scale-95"
          >
            카드 결제
          </button>
        </div>
      </div>
    </div>
  );
}

PaymentSelectorComponent.displayName = 'PaymentSelector';

export const PaymentSelector = memo(PaymentSelectorComponent);
