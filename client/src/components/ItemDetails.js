import React from "react";
import { styled } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemContext } from "../ItemContext";
import { CompanyContext } from "../CompanyContext";
import { UserContext } from "../UserContext";

const ItemDetails = () => {
  const { items } = useContext(ItemContext);
  const { companies } = useContext(CompanyContext);
  const { id } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const foundItem = items.find((item) => item._id === parseInt(id));

    setItem(foundItem);

    const matchedCompany = companies.find(
      (company) => company._id === foundItem.companyId
    );
    if (matchedCompany) {
      setCompanyName(matchedCompany.name);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      _id: item._id,
      qty: qty,
    };
    const newData = JSON.stringify(data);
    fetch(`/add-item-to-cart/${currentUser}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: newData,
    })
      .then((res) => res.json())
      .then((parse) => {
        if (parse.status === 200) {
          window.alert("Item added to the cart");
          navigate("/");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <Wrapper>
      <ItemContainer>
        {item && (
          <ItemWrapper>
            <ItemName>{item.name}</ItemName>
            <Flex>
              <Pictures key={item.id} src={item.imageSrc} alt="Item" />
              <Info>
                <Price>{item.price}</Price>
                <Category>{item.category}</Category>
                <Company>{companyName}</Company>
                <Stock>Stock remaining: {item.numInStock}</Stock>
              </Info>
              <DropDown>
                <select
                  onChange={(event) => setQty(event.target.value)}
                  defaultValue={qty}
                >
                  {Array(10)
                    .fill()
                    .map((_item, index) => (
                      <option key={index}>{index}</option>
                    ))}
                </select>
              </DropDown>
              {item.numInStock === 0 ? (
                <Button disabled>{"Out of Stock"}</Button>
              ) : (
                <Button onClick={handleSubmit}>{"Add To Cart"}</Button>
              )}
            </Flex>
          </ItemWrapper>
        )}
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  background-color: lightgrey;
  height: 100vh;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: solid 5px grey; */
  margin-top: 10em;
  max-width: 50em;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 25px;
  font-weight: bold;
  box-shadow: 0 2px 4px 0 #808080, 0 4px 10px 0 #808080;
`;
const ItemWrapper = styled.div``;
const DropDown = styled.div`
  margin-top: 2.7em;
  margin-left: 5em;
  margin-right: 0.5em;
`;
const Button = styled.button`
  margin-top: 2em;
  height: 4em;
  width: 10em;
  border: none;
  border-radius: 15px;
  background-color: darkblue;
  transition-duration: 400ms;
  color: white;
  cursor: pointer;
  &:hover:enabled {
    transform: scale(1.1, 1.1);
  }
  /* &:active:enabled{
        transform: scale(0.9, 0.9);
        
    } */
  &:disabled {
    transition-duration: 400ms;
    background-color: grey;
  }
`;
const Pictures = styled.img`
  border-radius: 25px;
  margin-left: 1em;
`;
const ItemName = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
  font-weight: bold;
  font-size: 1.5em;
  margin-left: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Price = styled.div`
  margin-left: 1em;
  font-size: 2em;
  margin-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
`;
const Category = styled.div`
  margin-left: 3em;
  margin-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
`;
const Company = styled.div`
  margin-left: 3em;
  margin-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
`;
const Stock = styled.div`
  margin-left: 3em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
`;
const Flex = styled.div`
  display: flex;
  padding: 1em;
`;
export default ItemDetails;
