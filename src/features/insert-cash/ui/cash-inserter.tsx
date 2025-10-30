import { memo } from 'react';
import { formatCurrencyWithKRW } from '~/shared/lib/format';
import { CASH_DENOMINATIONS } from '~/shared/lib/payment';
import type { CashDenomination } from '~/shared/types';

interface CashInserterProps {
  currentBalance: number;
  onInsert: (amount: CashDenomination) => void;
}

function CashInserterComponent(props: CashInserterProps) {
  const { currentBalance, onInsert } = props;

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
            onClick={() => onInsert(denomination)}
            className={`rounded-lg bg-amber-500 px-3 py-4 font-bold text-white transition duration-75 hover:bg-amber-600 active:scale-95 active:shadow-lg active:shadow-amber-700 ${denomination === 10000 ? 'col-span-2' : 'col-span-1'}`}
          >
            {formatCurrencyWithKRW(denomination)}
          </button>
        ))}
      </div>
    </div>
  );
}

CashInserterComponent.displayName = 'CashInserterComponent';

export const CashInserter = memo(CashInserterComponent);
