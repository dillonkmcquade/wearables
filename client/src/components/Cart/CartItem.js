import { useState, useContext } from "react";
import { styled } from "styled-components";
import { UserContext } from "../../context/UserContext";
import QtyDropDown from "./QtyDropDown";

export default function CartItem({ cart, setCart, item }) {
  const [qty, setQty] = useState(item.qty);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleRemoveFromCart = async () => {
    try {
      const request = await fetch(`/cart/delete/${currentUser.cartId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: item._id,
        }),
      });
      const response = await request.json();
      if (response.status === 200) {
        setCart(response.cartItems);
        setCurrentUser({ ...currentUser, cartQty: currentUser.cartQty - 1 });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Item key={item._id}>
      <Image src={item.imageSrc} />
      <Details>
        <Name>{item.name}</Name>
        <Brand>{item.brand}</Brand>
        <QtyDropDown
          id={item._id}
          qty={qty}
          inventory={item.numInStock}
          currentUser={currentUser}
          setQty={setQty}
          cart={cart}
          setCart={setCart}
        />
        <RemoveFromCart onClick={handleRemoveFromCart}>
          Remove from cart
        </RemoveFromCart>
        <Price>{item.price}</Price>
      </Details>
    </Item>
  );
}
const Item = styled.div`
  display: flex;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 15px;
  border-radius: 4px;
  min-width: 50%;
`;
const Name = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
`;
const Image = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  @media (max-width: 500px) {
    height: 100px;
    width: 100px;
  }
`;

const Details = styled.div`
  margin-left: 15px;
`;
const Brand = styled.p`
  color: gray;
  font-style: italic;
  margin-top: 1rem;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  @media (min-width: 500px) {
  }
`;
const RemoveFromCart = styled.button`
  color: #6b34eb;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #581aa3;
  }
`;
