import styled from "styled-components";
import { useState } from "react";

const PurchaseForm = ({ setFormData, formData, setItems, items }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Form>
        <strong>Customer Info</strong>
        <CustomerInfo>
          <Label>First Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John"
            onChange={handleChange}
          />
          <Label>Last Name</Label>
          <Input
            id="lname"
            name="lname"
            type="text"
            placeholder="Smith"
            onChange={handleChange}
          />
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="example@email.com"
            onChange={handleChange}
          />

          <Label>Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="123 street"
            onChange={handleChange}
          />

          <Label>City</Label>
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="Montreal"
            onChange={handleChange}
          />
          <Label>Country</Label>
          <Input
            id="country"
            name="country"
            type="text"
            placeholder="Canada"
            onChange={handleChange}
          />
          <Label>Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            type="text"
            placeholder="1x1 1d1"
            onChange={handleChange}
          />
        </CustomerInfo>
        <strong>Payment Info</strong>
        <PaymentInfo>
          <Label>Credit Card Number</Label>
          <Input
            id="creditCard"
            name="creditCard"
            type=""
            placeholder="1234432165436789"
            onChange={handleChange}
          />
          <Label>Expiration Date</Label>
          <Input
            id="expiration"
            name="expiration"
            type=""
            placeholder="07-23"
            onChange={handleChange}
          />
        </PaymentInfo>
        <strong>Billing Address</strong>
        <label>
          Billing Address Same as Shipping Address
          <input
            type="checkbox"
            value=""
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
          />
        </label>
        <BillingAddress>
          <Label>First Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John"
            onChange={handleChange}
            disabled={isChecked}
          />
          <Label>Last Name</Label>
          <Input
            id="lname"
            name="lname"
            type="text"
            placeholder="Smith"
            onChange={handleChange}
            disabled={isChecked}
          />
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="example@email.com"
            onChange={handleChange}
            disabled={isChecked}
          />

          <Label>Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="123 street"
            onChange={handleChange}
            disabled={isChecked}
          />

          <Label>City</Label>
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="Montreal"
            onChange={handleChange}
            disabled={isChecked}
          />
          <Label>Country</Label>
          <Input
            id="country"
            name="country"
            type="text"
            placeholder="Canada"
            onChange={handleChange}
            disabled={isChecked}
          />
          <Label>Postal Code</Label>
          <Input
            id="postalCode"
            name="postalcode"
            type="text"
            placeholder="1x1 1d1"
            onChange={handleChange}
            disabled={isChecked}
          />
        </BillingAddress>
        <strong>Overview</strong>
        <Overview>
          {!items ? (
            <p>loading</p>
          ) : (
            items.map((item) => {
              return (
                <Item key={item._id}>
                  <Image src={item.imageSrc} />
                  <Details>
                    <Name>{item.name}</Name>
                    <Brand>{item.brand}</Brand>
                    <Price>{item.price}</Price>
                  </Details>
                </Item>
              );
            })
          )}
        </Overview>
      </Form>
    </>
  );
};
export default PurchaseForm;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  margin-left: 1.5rem;
  margin-top: 2.5rem;
  background-color: white;
  min-width: 60%;
  border: 0.3rem solid #06013b;
  border-radius: 0.5rem;
  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;
const CustomerInfo = styled.div`
  padding: 1rem;
  border-bottom: 0.2rem solid #06013b;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const PaymentInfo = styled.div`
  padding: 1rem;
  border-bottom: 0.2rem solid #06013b;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const BillingAddress = styled.div`
  padding: 1rem;
  border-bottom: 0.2rem solid #06013b;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Overview = styled.div`
  padding: 1rem;
  padding: 1rem;
  display: flex;
  /*   justify-content: center; */
  flex-direction: column;
  margin-top: 5%;
`;
const Item = styled.div`
  display: flex;
  box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  padding: 15px;
  border-radius: 4px;
  min-width: 200px;
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
const Name = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;
const Details = styled.div`
  margin-left: 15px;
`;
const Brand = styled.p`
  color: gray;
  font-style: italic;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  @media (min-width: 500px) {
  }
`;
const Label = styled.label`
  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;
const Input = styled.input`
  color: #06013b;
  font-weight: bold;
  font-size: 1rem;
  @media (max-width: 400px) {
    max-width: 150px;
  }
`;
