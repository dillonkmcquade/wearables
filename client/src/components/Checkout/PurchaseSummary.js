import styled from "styled-components";
import { useEffect, useState } from "react";

const PurchaseSummary = ({ handleSubmit, items }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (items) {
      const reducedCart = items.reduce((accumulator, currentValue) => {
        const priceAsNumber = Number(currentValue.price.slice(1));
        return accumulator + currentValue.qty * priceAsNumber;
      }, 0);
      setTotal(reducedCart);
    }
  }, [items]);

  return (
    <Wrapper>
      <strong>Order Summary</strong>
      <OrderSummary>
        <SubSection>
          <Text>Items total</Text>
          <Charges>$ {total.toFixed(2)}</Charges>
        </SubSection>
        <SubSection>
          <Text>Shipping & handling</Text>
          <Charges>$ 15</Charges>
        </SubSection>
        <SubSection>
          <Text>Total before tax:</Text>
          <Charges>$ {(total + 15).toFixed(2)}</Charges>
        </SubSection>
      </OrderSummary>
      <Total>
        <SubSection>
          <Text>Order Total</Text>
          <Charges>${(total + 15 + 0.15 * total).toFixed(2)}</Charges>
        </SubSection>
      </Total>
      <OrderButton onClick={handleSubmit}>Place your order</OrderButton>
    </Wrapper>
  );
};

export default PurchaseSummary;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background-color: white;
  border: 0.3rem solid #06013b;
  margin-left: 1.5rem;
  margin-top: 2.5rem;
  min-width: 25%;
  max-height: 30rem;
  border-radius: 0.5rem;
  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;
const OrderButton = styled.button`
  ont-size: 1rem;
  font-weight: bold;
  padding:1rem 3rem 1rem 3rem;
  background-color: #4287f5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: none;
 
  transition: all ease-in-out 0.1s;
  &:hover {
    background-color: #4278f5;
  }
  &:active {
    scale: 0.9;
`;
const SubSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
`;
const Text = styled.div``;
const Charges = styled.div``;
const OrderSummary = styled.div`
  border-bottom: 0.2rem solid #06013b;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Total = styled.div`
  border-bottom: 0.2rem solid #06013b;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #06013b;
  font-weight: bold;
`;
