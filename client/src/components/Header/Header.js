import React from "react";
import { styled } from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMagnifyingGlass, HiOutlineUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import CatBurger from "./CatBurger";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const Header = () => {
  const { name, currentUser } = useContext(UserContext);

  return (
    <Wrapper>
      <Title to="/">Wearables</Title>
      <Search>
        <CatBurger />
        <form>
          <Input placeholder="What do you need?" />
          <Button type="submit">
            <HiMagnifyingGlass size={33} />
          </Button>
        </form>
        <SignIn to={currentUser ? "/" : "/signin"}>
          <HiOutlineUser size={35} />
          <span>{name ? name : "Sign in"}</span>
        </SignIn>
      </Search>
      <Cart to={currentUser ? "/cart" : "/"}>
        <AiOutlineShoppingCart size={35} />
      </Cart>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  height: 3em;
  display: flex;
  background-color: #06013b;
  align-items: center;
`;
const Title = styled(NavLink)`
  color: white;
  margin-left: 3em;
  font-size: 1.3em;
  text-decoration: none;
`;
const Search = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const Button = styled.button`
  border: none;
  background-color: #06013b;
  color: white;
  cursor: pointer;
`;
const Input = styled.input`
  width: 30em;
  height: 2em;
  border: none;
  border-radius: 30px;
`;
const SignIn = styled(NavLink)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  span {
    margin-top: 0.3em;
  }
`;
const Cart = styled(NavLink)`
  color: white;
  margin-right: 3em;
  cursor: pointer;
`;
export default Header;
