import { memo } from 'react';
import { formatCurrencyWithKRW } from '~/shared/lib/format';
import { CASH_DENOMINATIONS } from '~/shared/lib/payment';
import type { CashDenomination } from '~/shared/types';

interface CashInserterProps {
  currentBalance: number;
  minPrice: number;
  canSelectProduct: boolean;
  onInsert: (amount: CashDenomination) => void;
  onGoToProductSelection: () => void;
  onCancel: () => void;
}

function CashInserterComponent(props: CashInserterProps) {
  const { currentBalance, minPrice, canSelectProduct, onInsert, onGoToProductSelection, onCancel } = props;

  return (
    <div className="rounded-lg bg-white p-3 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">현금을 투입하세요.</h2>

      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <div className="text-center">
          <div className="mb-1 text-sm text-gray-600">현재 투입 금액</div>
          <div className="text-3xl font-bold text-amber-600">{formatCurrencyWithKRW(currentBalance)}</div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {CASH_DENOMINATIONS.map((denomination) => (
          <button
            key={denomination}
            type="button"
            onClick={() => onInsert(denomination)}
            className={`rounded-lg bg-amber-500 px-3 py-4 font-bold text-white transition duration-75 hover:bg-amber-600 active:scale-95 active:shadow-lg active:shadow-amber-700 ${denomination === 10000 ? 'col-span-2' : 'col-span-1'}`}
          >
            {formatCurrencyWithKRW(denomination)}
          </button>
        ))}
      </div>

      <div className="space-y-2 border-t-2 border-gray-200 pt-6">
        <button
          type="button"
          onClick={onGoToProductSelection}
          disabled={!canSelectProduct}
          className={`w-full rounded-lg px-3 py-4 font-bold transition-colors duration-200 ${
            canSelectProduct ? 'bg-blue-500 text-white hover:bg-blue-600' : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          {canSelectProduct ? '상품 선택' : `최소 ${formatCurrencyWithKRW(minPrice)} 필요`}
        </button>
        <button onClick={onCancel} className="w-full rounded-lg bg-red-500 px-3 py-4 font-bold text-white transition-colors duration-200 hover:bg-red-600">
          현금 반환
        </button>
      </div>
    </div>
  );
}

CashInserterComponent.displayName = 'CashInserterComponent';

export const CashInserter = memo(CashInserterComponent);
