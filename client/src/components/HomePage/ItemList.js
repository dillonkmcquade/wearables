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

  useEffect(() => {
    if (items) {
      const filtered = items.filter((item) => {
        return item.category === category;
      });
      setRandomItems(getRandomItems(filtered));
    }
  }, [category, items]);
  const getRandomItems = (filtered) => {
    const randomItems = [];
    const shuffledItems = [...filtered].sort(() => Math.random() - 0.5);
    for (let i = 0; i < 10; i++) {
      randomItems.push(shuffledItems[i]);
    }
    return randomItems;
  };

  const handleChange = function (event) {
    setCategory(event.target.value);
  };

  return (
    <ItemsContainer>
      <CheckboxList>
        <Label>
          Lifestyle
          <input
            type="radio"
            name="Category"
            value="Lifestyle"
            defaultChecked
            onChange={handleChange}
          />
        </Label>
        <Label>
          Fitness
          <input
            type="radio"
            name="Category"
            value="Fitness"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Medical
          <input
            type="radio"
            name="Category"
            value="Medical"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Entertainment
          <input
            type="radio"
            name="Category"
            value="Entertainment"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Industrial
          <input
            type="radio"
            name="Category"
            value="Industrial"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Pets and Animals
          <input
            type="radio"
            name="Category"
            value="Pets and Animals"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Gaming
          <input
            type="radio"
            name="Category"
            value="Gaming"
            onChange={handleChange}
          />
        </Label>
      </CheckboxList>
      <Itemlist>
        {randomItems &&
          randomItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                handler={() => {
                  navigate(`/items/${item._id}`);
                }}
                item={item}
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
  gap: 3rem;
  padding: 2rem;
`;
const Itemlist = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;
  color: white;
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
