import { styled } from "styled-components";
export default function ItemCard({ handler, item }) {
  return (
    <ItemBox onClick={handler}>
      <ProductImage src={`${item.imageSrc}`} />
      <Detail>
        <Price>{item.price}</Price>
        <Name>{item.name}</Name>
      </Detail>
    </ItemBox>
  );
}
const ItemBox = styled.div`
  font-size: 0.75em;
  background-color: white;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #06013b;
  margin: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
  width: 250px;
  height: 250px;
  &:hover {
    opacity: 0.9;
  }
`;
const ProductImage = styled.img`
  height: 60%;
  width: 100%;
  object-fit: contain;
`;
const Name = styled.div`
  align-self: flex-start;
`;
const Price = styled.div`
  align-self: flex-start;
  font-size: 1.2em;
  color: black;
  margin: 1em 0;
  font-weight: bold;
  letter-spacing: 0.03rem;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  letter-spacing: 0.03rem;
  max-height: 40%;
  overflow: hidden;
`;
