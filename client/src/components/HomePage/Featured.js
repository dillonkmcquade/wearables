import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemContext } from "../../context/ItemContext";

const Featured = () => {
  const navigate = useNavigate();
  const { items } = useContext(ItemContext);

  return (
    items && (
      <BoxContainer>
        <BoxOne
          onClick={() => {
            navigate("/categories/Lifestyle");
          }}
        >
          <TextImageContainer>
            <Text> LifeStyle</Text>
            <ImageCategory
              src={"images/lifestyle.jpg"}
              alt={"lifestyle image"}
            />
          </TextImageContainer>
          {items
            .filter((element) => element.category === "Lifestyle")
            .slice(0, 3)
            .map((item) => {
              return (
                <ItemBox key={item._id}>
                  {item.name}
                  <Image src={`${item.imageSrc}`} />
                  {item.price}
                </ItemBox>
              );
            })}
        </BoxOne>

        <BoxTwo
          onClick={() => {
            navigate("/categories/Fitness");
          }}
        >
          <TextImageContainer>
            <Text>Fitness</Text>
            <ImageCategory src={"images/fitness.jpg"} alt="fitness image" />
          </TextImageContainer>
          {items
            .filter((element) => element.category === "Fitness")
            .slice(0, 3)
            .map((item) => {
              return (
                <ItemBox key={item._id}>
                  {item.name}
                  <Image src={`${item.imageSrc}`} />
                  {item.price}
                </ItemBox>
              );
            })}
        </BoxTwo>

        <BoxThree
          onClick={() => {
            navigate("/categories/Entertainment");
          }}
        >
          <TextImageContainer>
            <Text>Entertainment</Text>
            <ImageCategory
              src={"images/entertainment.jpg"}
              alt="entertainment image"
            />
          </TextImageContainer>
          {items
            .filter((element) => element.category === "Entertainment")
            .slice(0, 3)
            .map((item) => {
              return (
                <ItemBox key={item._id}>
                  {item.name}
                  <Image src={`${item.imageSrc}`} />
                  {item.price}
                </ItemBox>
              );
            })}
        </BoxThree>
      </BoxContainer>
    )
  );
};

export default Featured;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 35rem 35rem 35rem;
  justify-items: center;
  gap: 2rem;

  @media (max-width: 1440px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
  @media (max-width: 1000px) {
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
  text-align: center;
  padding: 1rem;
  box-shadow:
    0 0.1rem 0.2rem 0 #808080,
    0 0.1rem 0.2rem #808080;
  width: 15rem;
  height: 15rem;
  cursor: pointer;
`;

const BoxOne = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const BoxTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const BoxThree = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const TextImageContainer = styled.div`
  font-size: 3rem;
  text-align: center;
  position: relative;
  width: 17rem;
  height: 17rem;
`;
const Text = styled.div`
  color: #06013b;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 2.5rem;
`;
const ImageCategory = styled.img`
  border-radius: 3rem;
  width: 100%;
  height: 100%;
  opacity: 60%;
  box-shadow:
    0 0.1rem 0.2rem 0 #808080,
    0 0.1rem 0.2rem #808080;
`;

const Image = styled.img`
  border-radius: 3rem;
  margin-bottom: 0.5rem;
  height: 6.25rem;
  width: 6.25rem;
`;
