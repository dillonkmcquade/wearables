import ItemList from "./ItemList";
import Featured from "./Featured";
import styled from "styled-components";
// import Header from "./Header";

const HomePage = () => {
  return (
    <Homepage>
      <Container>
        <Featured />
        <ItemList />
      </Container>
    </Homepage>
  );
};
export default HomePage;

const Homepage = styled.div`
  background-color: #e1e3eb;
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: 0;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
`;
