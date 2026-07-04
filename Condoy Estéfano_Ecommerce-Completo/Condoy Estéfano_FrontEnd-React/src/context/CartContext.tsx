import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { CartItem, Product } from "../types";

interface CartContextValue {
  items: CartItem[];
  search: string;
  cartCount: number;
  total: number;
  setSearch: (value: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CART_KEY = "coltis.cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

function storedCart(): CartItem[] {
  try {
    const value = localStorage.getItem(CART_KEY);
    return value ? (JSON.parse(value) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(storedCart);
  const [search, setSearch] = useState("");

  const save = useCallback((nextItems: CartItem[]) => {
    setItems(nextItems);
    localStorage.setItem(CART_KEY, JSON.stringify(nextItems));
  }, []);

  const addToCart = useCallback((product: Product) => {
    setItems(current => {
      const existing = current.find(item => item.product.productId === product.productId);
      const next = existing
        ? current.map(item => item.product.productId === product.productId
          ? { ...item, quantity: Math.min(item.quantity + 1, product.amount) }
          : item)
        : [...current, { product, quantity: 1 }];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(current => {
      const next = current.filter(item => item.product.productId !== productId);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems(current => {
      const next = current.map(item => item.product.productId === productId
        ? {
            ...item,
            quantity: Math.max(1, Math.min(quantity, item.product.amount))
          }
        : item);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => save([]), [save]);

  const cartCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(() => ({
    items,
    search,
    cartCount,
    total,
    setSearch,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }), [
    items,
    search,
    cartCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider.");
  }
  return context;
}
