"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string, size: string) => void;
  totalCount: number;
}

const CartContext = createContext<CartCtx>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  totalCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const totalCount = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
