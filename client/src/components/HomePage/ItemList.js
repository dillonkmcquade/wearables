import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../../context/ItemContext";
import ItemCard from "../ItemCard";

const ItemList = () => {
  const { items } = useContext(ItemContext);
  const [category, setCategory] = useState("Lifestyle");
  const [randomItems, setRandomItems] = useState(null);
  const navigate = useNavigate();
  const categories = [
    "Lifestyle",
    "Fitness",
    "Medical",
    "Entertainment",
    "Industrial",
    "Pets and Animals",
    "Gaming",
  ];

  useEffect(() => {
    const getRandomItems = function (filtered) {
      const randomItems = new Array(10);
      const shuffledItems = filtered.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 10; i++) {
        randomItems.push(shuffledItems[i]);
      }
      return randomItems;
    };
    if (items) {
      const filtered = items.filter((item) => item.category === category);
      if (!filtered || filtered.length < 10) {
        setRandomItems(filtered);
      } else {
        setRandomItems(getRandomItems(filtered));
      }
    }
  }, [category, items]);

  const handleChange = function (event) {
    setCategory(event.target.value);
  };

  return (
    <ItemsContainer>
      <CheckboxList>
        {categories.map((category, index) => (
          <Label key={category}>
            {category}
            <CheckBox
              value={category}
              defaultChecked={index === 0}
              onChange={handleChange}
            />
          </Label>
        ))}
      </CheckboxList>
      <Itemlist>
        {randomItems &&
          randomItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                handler={() => {
                  navigate(`/items/${item._id}`);
                }}
              />
            );
          })}
      </Itemlist>
    </ItemsContainer>
  );
};

export default ItemList;
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 2rem 0;
`;
const Itemlist = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;
  @media (max-width: 1440px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
  }
`;
const CheckboxList = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  color: #06013b;
  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 450px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }
`;

const CheckBox = styled.input.attrs({
  type: "radio",
  name: "Category",
})``;

const Label = styled.label`
  color: #06013b;
  @media (max-width: 1000px) {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    align-items: center;
  }
  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
  }
`;
