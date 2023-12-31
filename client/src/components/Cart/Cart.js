/*
Fetch cart from DB, filter items in cache to display the user's cart
*/
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import SubTotal from "./SubTotal";
import { UserContext } from "../../context/UserContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [cart, currentUser, navigate]);
  return (
    <Wrapper>
      <Items>
        {!cart || !cart.length ? (
          <Empty>Cart is empty</Empty>
        ) : (
          cart.map((item) => {
            return (
              <CartItem
                key={item._id}
                item={item}
                setCart={setCart}
                cart={cart}
              ></CartItem>
            );
          })
        )}
      </Items>
      <SubTotal cart={cart} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 5% auto;
  width: 95vw;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
const Items = styled.div`
  min-width: 50%;
`;

const Empty = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;
