import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";

export const useCart = () => {
  const [cart, setCart] = useState();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getCart = async function () {
      try {
        const request = await fetch(`/cart/${currentUser}`);
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
    } else {
      return;
    }
  }, []);
  return { setCart, cart, currentUser };
};
