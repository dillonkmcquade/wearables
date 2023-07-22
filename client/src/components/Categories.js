import React from "react";
import { styled } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import { NavLink, useParams } from "react-router-dom";

const Categories = () => {
  const { items } = useContext(ItemContext);
  const { id } = useParams();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let filterValue = id;

    if (id.includes("-")) {
      filterValue = id.split("-").join(" ");
    }

    const filteredItemsArray = items.filter(
      (item) => item.category === filterValue,
    );
    setFilteredItems(filteredItemsArray);
  }, [id, items]);

  return (
    <Wrapper>
      <Flex>
        <Name>{id.includes("-") ? id.split("-").join(" ") : id}</Name>
      </Flex>
      <ItemContainer>
        {filteredItems.map((item) => (
          <ItemWrapper to={`/items/${item._id}`} key={item._id}>
            <Pictures src={item.imageSrc} alt="Item" />
            <Price>{item.price}</Price>
            <ItemName>{item.name}</ItemName>
          </ItemWrapper>
        ))}
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  background-color: lightgrey;
`;
const ItemContainer = styled.div`
  /* display: flex;
    flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  padding: 2rem;
  color: white;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ItemWrapper = styled(NavLink)`
  background-color: white;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #06013b;
  text-align: center;
  text-decoration: none;
  margin: 1.5rem;
  padding: 1rem;
  box-shadow:
    0 2px 4px 0 #808080,
    0 4px 10px 0 #808080;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
`;
const Name = styled.div`
  text-align: center;
  margin: 1em auto;
  font-size: 3em;
  background-color: #06013b;
  color: white;
  border-radius: 30px;
  display: inline-block;
  padding: 0 1em 0 1em;
  box-shadow:
    0 2px 4px 0 #808080,
    0 4px 10px 0 #808080;
`;
const Pictures = styled.img`
  border-radius: 20px;
`;
const Price = styled.div`
  margin: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  font-weight: bold;
  text-align: center;
`;
const ItemName = styled.div`
  max-width: 10em;
  font-weight: bold;
  margin: 1em;
`;
export default Categories;
