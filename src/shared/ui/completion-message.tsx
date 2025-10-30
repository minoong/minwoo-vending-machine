import { useEffect, useState } from 'react';
import { formatCurrencyWithKRW } from '~/shared/lib/format';

interface CompletionMessageProps {
  productName: string;
  changeAmount?: number;
  onComplete: () => void;
}

export function CompletionMessage(props: CompletionMessageProps) {
  const { productName, changeAmount, onComplete } = props;
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [onComplete]);

  return (
    <>
      <div className="fixed inset-0 z-51 flex items-center justify-center bg-black opacity-50" />
      <div className="fixed top-1/2 left-1/2 z-52 mx-4 w-9/12 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-center shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="animate-in zoom-in flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 duration-300">
            <svg className="h-12 w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-amber-600">구매 완료!</h2>

        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">구매하신 상품</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">{productName}</p>
        </div>

        {changeAmount !== undefined && changeAmount > 0 && (
          <div className="mb-6 rounded-lg bg-amber-50 p-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">💰</span>
              <div className="text-left">
                <p className="text-sm text-gray-600">거스름돈</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrencyWithKRW(changeAmount)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 감사 메시지 */}
        <p className="mb-4 text-lg font-medium text-gray-700">감사합니다!</p>

        {/* 카운트다운 */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>{countdown}초 후 자동으로 처음으로 돌아갑니다</span>
        </div>
      </div>
    </>
  );
}
