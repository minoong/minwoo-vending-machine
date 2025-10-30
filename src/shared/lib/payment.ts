import type { CashDenomination } from '~/shared/types';

export const CASH_DENOMINATIONS: CashDenomination[] = [100, 500, 1000, 5000, 10000];

export const processCardPayment = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.1);
    }, 1500);
  });
};
