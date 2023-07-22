//Dropdown menu for updating quantity on cart page
import { styled } from "styled-components";
export default function QtyDropDown({
  cart,
  setCart,
  setQty,
  qty,
  id,
  currentUser,
  inventory,
}) {
  const updateCartItem = async (event) => {
    const request = await fetch(`/update-item-from-cart/${currentUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        updateQty: event.target.value,
      }),
    });
    const response = await request.json();

    if (response.status === 200) {
      setQty(event.target.value);
      const newCart = cart.map((cartItem) => {
        if (cartItem._id === id) {
          return { ...cartItem, qty: event.target.value };
        } else {
          return cartItem;
        }
      });

      setCart(newCart);
    }
  };
  return (
    <Select onChange={updateCartItem} defaultValue={qty}>
      {Array(inventory + 1)
        .fill()
        .map((_item, index) => (
          <option key={index}>{index}</option>
        ))}
    </Select>
  );
}

const Select = styled.select`
  margin-top: 1rem;
`;