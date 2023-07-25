import ItemList from "./ItemList";
import Featured from "./Featured";
import styled from "styled-components";

const HomePage = () => {
  return (
    <Homepage>
      <Hero>
        <HeroTitle>Wearables</HeroTitle>
      </Hero>
      <Title>Featured</Title>
      <Featured />
      <Rule />
      <Title>Suggested</Title>
      <ItemList />
    </Homepage>
  );
};
export default HomePage;

const Homepage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;
const Hero = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  width: 100%;
  height: 900px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url("./images/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
`;
const Title = styled.h1`
  font-size: 2.4em;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  color: black;
`;

const HeroTitle = styled(Title)`
  color: white;
  animation: fadeIn ease-in-out 3s;
  font-size: 3.5rem;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    ,
    100% {
      opacity: 1;
    }
  }
`;

const Rule = styled.hr`
  background-color: black;
  width: 80%;
  border-radius: 0.5rem;
  margin: 1rem auto;
`;
