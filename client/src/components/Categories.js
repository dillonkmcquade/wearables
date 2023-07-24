import React from "react";
import { styled } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import { NavLink, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

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
            <ItemCard item={item} />
          </ItemWrapper>
        ))}
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  color: white;
`;
const ItemWrapper = styled(NavLink)`
  text-decoration: none;
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
export default Categories;
