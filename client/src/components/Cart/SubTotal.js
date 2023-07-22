import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
export default function SubTotal({ cart }) {
  const [total, setTotal] = useState(0);
  const redirect = useNavigate();
  useEffect(() => {
    if (cart) {
      const reducedCart = cart.reduce((accumulator, currentValue) => {
        const priceAsNumber = Number(currentValue.price.slice(1));
        return accumulator + currentValue.qty * priceAsNumber;
      }, 0);
      setTotal(reducedCart);
    }
  }, [cart]);
  return (
    <Wrapper>
      <SubSection>
        <p>Sub total: </p>
        <Bold>${total.toFixed(2)}</Bold>
      </SubSection>
      <SubSection>
        <p>Shipping & handling: </p>
        <Bold>$15</Bold>
      </SubSection>
      <SubSection>
        <p>Tax (15%): </p>
        <Bold>${(0.15 * total).toFixed(2)}</Bold>
      </SubSection>
      <SubSection>
        <p>Total: </p>
        <Bold>${!total ? 0 : (total + 15 + 0.15 * total).toFixed(2)}</Bold>
      </SubSection>
      <Checkout
        disabled={!total ? true : false}
        color={total ? "#4287f5" : "gray"}
        hovercolor={total ? "#4278f5" : ""}
        cursor={total ? "pointer" : "not-allowed"}
        onClick={() => redirect("/checkout")}
      >
        Proceed to checkout
      </Checkout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-left: 15px;
  margin-top: 25px;
  min-width: 10%;
  max-height: 300px;
  border: 1px solid gray;
  border-radius: 5px;
  @media (min-width: 1200px) {
    margin-top: 0;
  }
`;

const SubSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const Bold = styled.p`
  font-weight: bold;
`;

const Checkout = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: ${(props) => props.cursor};
  margin-top: 10px;
  text-decoration: none;
  align-self: flex-end;
  transition: all ease-in-out 0.1s;

  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
  &:active {
    scale: 0.9;
  }
`;
