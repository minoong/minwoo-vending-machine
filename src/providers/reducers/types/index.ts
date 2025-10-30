import type { Product, Transaction, PaymentMethod, CashDenomination, ProductType, ErrorType } from '../../../shared/types';

export interface VendingMachineState {
  products: Product[];
  currentTransaction: Transaction;
}

export type VendingMachineAction =
  | { type: '결제_수단_선택'; payload: PaymentMethod }
  | { type: '현금_투입'; payload: CashDenomination }
  | { type: '상품_선택_화면_이동' }
  | { type: '금액_추가' }
  | { type: '카드_결제_처리_시작' }
  | { type: '신용카드_결제_성공' }
  | { type: '신용카드_결제_실패' }
  | { type: '상품_선택'; payload: ProductType }
  | { type: '장바구니_상품_추가'; payload: ProductType }
  | { type: '장바구니_상품_제거'; payload: ProductType }
  | { type: '상품_수량_증가'; payload: ProductType }
  | { type: '상품_수량_감소'; payload: ProductType }
  | { type: '구매_완료_처리' }
  | { type: '상품_출고' }
  | { type: '거스름돈_반환' }
  | { type: '거래_완료' }
  | { type: '거래_취소' }
  | { type: '에러_설정'; payload: ErrorType }
  | { type: '에러_제거' }
  | { type: '초기화' };
