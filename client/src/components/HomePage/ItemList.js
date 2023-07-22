import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../../ItemContext";

const ItemList = () => {
  const [category, setCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const { items } = useContext(ItemContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (items) {
      setFilteredItems(() => {
        if (category === null) {
          return items;
        } else {
          return items.filter((item) => {
            return item.category === category;
          });
        }
      });
    }
  }, [category, items]);

  const getRandomItems = () => {
    const randomItems = [];
    const shuffledItems = [...filteredItems].sort(() => Math.random() - 0.5);
    for (let i = 0; i < filteredItems.length; i++) {
      randomItems.push(shuffledItems[i]);
    }
    return randomItems.slice(0, 10);
  };

  return (
    items && (
      <ItemsContainer>
        <CheckboxList>
          <Label>
            Lifestyle
            <input
              type="checkbox"
              checked={category === "Lifestyle"}
              value="Lifestyle"
              onChange={() => {
                category === "Lifestyle"
                  ? setCategory(null)
                  : setCategory("Lifestyle");
              }}
            />
          </Label>
          <Label>
            Fitness
            <input
              type="checkbox"
              name="Category"
              value="Fitness"
              checked={category === "Fitness"}
              onChange={() => {
                category === "Fitness"
                  ? setCategory(null)
                  : setCategory("Fitness");
              }}
            />
          </Label>
          <Label>
            Medical
            <input
              type="checkbox"
              name="Category"
              value="Medical"
              checked={category === "Medical"}
              onChange={() => {
                category === "Medical"
                  ? setCategory(null)
                  : setCategory("Medical");
              }}
            />
          </Label>
          <Label>
            Entertainment
            <input
              type="checkbox"
              name="Category"
              value="Entertainment"
              checked={category === "Entertainment"}
              onChange={() => {
                category === "Entertainment"
                  ? setCategory(null)
                  : setCategory("Entertainment");
              }}
            />
          </Label>
          <Label>
            Industrial
            <input
              type="checkbox"
              name="Category"
              value="Industrial"
              checked={category === "Industrial"}
              onChange={() => {
                category === "Industrial"
                  ? setCategory(null)
                  : setCategory("Industrial");
              }}
            />
          </Label>
          <Label>
            Pets and Animals
            <input
              type="checkbox"
              name="Category"
              value="Pets and Animals"
              checked={category === "Pets and Animals"}
              onChange={() => {
                category === "Pets and Animals"
                  ? setCategory(null)
                  : setCategory("Pets and Animals");
              }}
            />
          </Label>
          <Label>
            Gaming
            <input
              type="checkbox"
              name="Category"
              value="Gaming"
              checked={category === "Gaming"}
              onChange={() => {
                category === "Gaming"
                  ? setCategory(null)
                  : setCategory("Gaming");
              }}
            />
          </Label>
        </CheckboxList>
        <Itemlist>
          {items.length > 0 &&
            getRandomItems().map((item) => {
              return (
                <ItemBox
                  key={item._id}
                  onClick={() => {
                    navigate(`/items/${item._id}`);
                  }}
                >
                  {item.name}
                  <Image src={`${item.imageSrc}`} />
                  {item.price}
                </ItemBox>
              );
            })}
        </Itemlist>
      </ItemsContainer>
    )
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
const ItemBox = styled.div`
  background-color: white;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #06013b;
  text-align: center;
  margin: 2rem;
  padding: 1rem;
  box-shadow: 0 2px 4px 0 #808080, 0 4px 10px 0 #808080;
  width: 15rem;
  height: 15rem;
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
const Image = styled.img`
  height: 6.25rem;
  width: 6.25rem;
`;
