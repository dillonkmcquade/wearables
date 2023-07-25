import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";

const CatBurger = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const listener = () => {
      if (open) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", listener);
    return () => window.removeEventListener("mousedown", listener);
  }, [location]);
  return (
    <Wrapper>
      <Hamburger onClick={() => setOpen(open ? false : true)} size={20} />
      <Menu className={`${open ? "active" : "inactive"}`}>
        <ul>
          <Item to="/categories/Lifestyle">LifeStyle</Item>
          <Item to="/categories/Fitness">Fitness</Item>
          <Item to="/categories/Medical">Medical</Item>
          <Item to="/categories/Entertainment">Entertainment</Item>
          <Item to="/categories/Industrial">Industrial</Item>
          <Item to="/categories/Pets-and-Animals">Pets and Animals</Item>
          <Item to="/categories/Gaming">Gaming</Item>
        </ul>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: white;
  margin-right: 1em;
  z-index: 100;
`;
const Menu = styled.div`
  position: absolute;
  margin-top: 1.5em;
  background-color: white;
  top: 1rem;
  color: black;
  padding: 0.5rem;
  box-shadow: 0px 0px 13px 0px #000000;
  transition: 500ms;
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    height: 100%;
  }
  &:active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: var(--speed) ease;
  }
  &.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20);
    transition: var(--speed) ease;
    transition: 500ms;
  }
`;
const Item = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  margin-bottom: 0.4em;
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 0.2em;
  transition: 300ms;
  &:hover {
    cursor: pointer;
    color: red;
    transition: 300ms;
  }
`;
const Hamburger = styled(GiHamburgerMenu)`
  cursor: pointer;
`;

export default CatBurger;
