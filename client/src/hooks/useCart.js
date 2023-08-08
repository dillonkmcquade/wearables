import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Fetch } from "../utils";

export const useCart = () => {
  const [cart, setCart] = useState();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getCart = async function () {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const request = await Fetch(`/cart`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (request.status !== 200) {
          return;
        }
        const { data } = await request.json();
        setCart(data.cartItems);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (!currentUser) return;
    getCart();
  }, [currentUser]);
  return { setCart, cart };
};
