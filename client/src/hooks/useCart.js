import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useCart = () => {
  const [cart, setCart] = useState();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getCart = async function () {
      try {
        const request = await fetch(`/cart/${currentUser.cartId}`);
        if (request.status !== 200) {
          return;
        }
        const { data } = await request.json();
        setCart(data.cartItems);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (currentUser) {
      getCart();
    }
  }, []);
  return { setCart, cart };
};
