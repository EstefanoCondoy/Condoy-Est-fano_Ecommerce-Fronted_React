export interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  imageUrl?: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: string;
  phoneNumber?: string;
}

export interface ReceiptItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Receipt {
  receiptId: number;
  userId: number;
  userEmail: string;
  total: number;
  amountOfItems: number;
  createdAt: string;
  items: ReceiptItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiError {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}
