export type ProductType = '콜라' | '생수' | '커피';

export interface Product {
  id: ProductType;
  name: string;
  price: number;
  stock: number;
}

export type PaymentMethod = '현금' | '신용카드' | null;

export type CashDenomination = 100 | 500 | 1000 | 5000 | 10000;

export interface Cash {
  denomination: CashDenomination;
  count: number;
}

export type TransactionStatus =
  | '대기_상태'
  | '결제_수단_선택_중'
  | '현금_투입_중'
  | '신용카드_처리_중'
  | '상품_선택_중'
  | '구매_처리_중'
  | '상품_출고_중'
  | '거스름돈_반환_중'
  | '거래_완료'
  | '거래_취소';

export type ErrorType = '잔액_부족' | '재고_없음' | '신용카드_인증_실패' | '출고_실패' | '거스름돈_부족' | '시스템_에러';

export interface CartItem {
  productId: ProductType;
  quantity: number;
}

export interface Transaction {
  id: string;
  paymentMethod: PaymentMethod;
  insertedAmount: number;
  purchaseAmount: number;
  changeAmount: number;
  selectedProduct: ProductType | null;
  cart: CartItem[];
  status: TransactionStatus;
  error: ErrorType | null;
  timestamp: number;
}
