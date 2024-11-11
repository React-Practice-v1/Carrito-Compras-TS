import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import { GuitarT, CartItem } from "../types/types";

export const useCart = () => {
  const inicialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(inicialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: GuitarT) => {
    const exist = cart.findIndex((guitar) => guitar.id === item.id);

    if (exist >= 0) {
      if (cart[exist].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[exist].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeCart = (id: GuitarT["id"]) => {
    // OPCION 1
    // setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));

    // OPCION 2
    const updatedCart = cart.filter((guitar) => guitar.id !== id);
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: GuitarT["id"]) => {
    setCart((prevCart) => {
      return prevCart.map((guitar) => {
        if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
          return { ...guitar, quantity: guitar.quantity - 1 };
        }
        return guitar;
      });
    });
  };

  const increaseQuantity = (id: GuitarT["id"]) => {
    // OPCION 1
    // setCart((prevCart) => {
    //   return prevCart.map((guitar) => {
    //     if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
    //       return { ...guitar, quantity: guitar.quantity + 1 };
    //     }
    //     return guitar;
    //   });
    // });

    // OPCION 2
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return { ...guitar, quantity: guitar.quantity + 1 };
      }
      return guitar;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    return setCart([]);
  };

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart]);

  return {
    data,
    cart,
    addToCart,
    removeCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
