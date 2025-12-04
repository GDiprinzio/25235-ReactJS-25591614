import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // sincroniza con localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // opcional: manejar error
      console.error("Error saving cart to localStorage", e);
    }
  }, [cart]);

  // función interna que actualiza estado de forma segura
  const persistCart = useCallback((next) => {
    setCart(next);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    if (!product || !product.id) return;
    setCart((prev) => {
      const idx = prev.findIndex((c) => String(c.id) === String(product.id));
      if (idx >= 0) {
        return prev.map((c, i) =>
          i === idx ? { ...c, quantity: (c.quantity || 1) + qty } : c
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: Number(product.price) || 0,
          thumbnail: product.thumbnail,
          quantity: qty,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((c) => String(c.id) !== String(productId)));
    toast.info("Producto eliminado del carrito");
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((c) => String(c.id) !== String(productId)));
      return;
    }
    setCart((prev) =>
      prev.map((c) =>
        String(c.id) === String(productId) ? { ...c, quantity } : c
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.info("Carrito vaciado");
  }, []);

  const getCartTotal = useCallback(
    () =>
      cart.reduce(
        (sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 1),
        0
      ),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      persistCart, // opcional exponerla si la necesitas
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      persistCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
