import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemContext } from "../../context/ItemContext";
import ItemCard from "../ItemCard";

const Featured = () => {
  const navigate = useNavigate();
  const { items } = useContext(ItemContext);
  const categories = ["Fitness", "Lifestyle", "Entertainment"];

  return (
    items && (
      <BoxContainer>
        {categories.map((category) => (
          <BoxOne key={category}>
            <TextImageContainer
              onClick={() => {
                navigate(`/categories/${category}`);
              }}
            >
              <Text>{category}</Text>
              <ImageCategory
                src={`images/${category.toLowerCase()}.jpg`}
                alt={`${category} image`}
              />
            </TextImageContainer>
            {items
              .filter((element) => element.category === category)
              .slice(0, 3)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    handler={() => navigate(`/items/${item._id}`)}
                    item={item}
                  />
                );
              })}
          </BoxOne>
        ))}
      </BoxContainer>
    )
  );
};

export default Featured;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 80vw;
`;

const BoxOne = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  padding: 0.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const TextImageContainer = styled.div`
  font-size: 3rem;
  text-align: center;
  position: relative;
  width: 12rem;
  height: 12rem;
  cursor: pointer;
  margin: 0.5rem;
  transition: scale ease-in 0.5s;
  &:hover {
    opacity: 0.9;
    scale: 1.1;
  }
`;
const Text = styled.div`
  color: #06013b;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 2rem;
`;
const ImageCategory = styled.img`
  border-radius: 0.4rem;
  width: 100%;
  height: 100%;
  opacity: 60%;
  box-shadow:
    0 0.1rem 0.2rem 0 #808080,
    0 0.1rem 0.2rem #808080;
`;
