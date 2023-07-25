import styled from "styled-components";
import PurchaseForm from "./PurchaseForm";
import PurchaseSummary from "./PurchaseSummary";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ItemContext } from "../../context/ItemContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const { fetchData } = useContext(ItemContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`/cart/${currentUser.cartId}`)
      .then((response) => response.json())
      .then((parsed) => {
        setItems(parsed.data.cartItems);
        setFormData({ _id: parsed.data._id });
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("/cart/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 201) {
          navigate(`/confirmation/${parsed.orderId}`);
          fetchData();
        } else {
          alert(parsed.message);
        }
      });
  };
  return (
    <>
      <Header>Checkout</Header>
      <Container>
        <PurchaseForm
          items={items}
          setFormData={setFormData}
          formData={formData}
          setItems={setItems}
        />
        <PurchaseSummary items={items} handleSubmit={handleSubmit} />
      </Container>
    </>
  );
};

export default CheckoutPage;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;
  background-color: #e1e3eb;
  margin: 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Header = styled.div`
  background-color: #e1e3eb;
  text-align: center;
  color: #06013b;
  font-size: 2rem;
  font-weight: bold;
  position: right;
  padding: 1rem;
  margin: 0;
`;
