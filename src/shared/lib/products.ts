import type { Product } from '~/shared/types';

const generateRandomStock = (): number => {
  return Math.floor(Math.random() * 16);
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '콜라',
    name: '콜라',
    price: 1100,
    stock: generateRandomStock(),
  },
  {
    id: '생수',
    name: '물',
    price: 600,
    stock: generateRandomStock(),
  },
  {
    id: '커피',
    name: '커피',
    price: 700,
    stock: generateRandomStock(),
  },
];
