import { styled } from "styled-components";
export default function Result({ data, handler }) {
  return (
    <Wrapper onClick={handler}>
      <ItemImage src={data.imageSrc} />
      <div>{data.name.slice(0, 40)}...</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  animation: none;
  margin: 0 auto;
  padding: 0.2rem;
  border-bottom: 1px solid gray;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  max-height: 35px;

  &.selected {
    background-color: #0f1410;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: none;
  }
`;

const ItemImage = styled.img`
  height: 100%;
  width: 35px;
  margin-right: 5px;
`;
