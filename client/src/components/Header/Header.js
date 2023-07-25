import React from "react";
import { styled } from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMagnifyingGlass, HiOutlineUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import CatBurger from "./CatBurger";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Wrapper>
      <Content>
        <Title to="/">Wearables</Title>
        <Search>
          <CatBurger />
          <form>
            <Input placeholder="What do you need?" />
            <SearchIcon size={25} />
          </form>
        </Search>
        <Cart to={currentUser ? "/cart" : "/"}>
          <AiOutlineShoppingCart size={25} />
        </Cart>
        <SignIn to={currentUser ? "/" : "/signin"}>
          <HiOutlineUser size={25} />
          <span>{currentUser ? currentUser.firstName : "Log in"}</span>
        </SignIn>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  height: 3em;
  display: flex;
  background-color: black;
  align-items: center;
  justify-content: center;
  width: 100vw;
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
const SearchIcon = styled(HiMagnifyingGlass)`
  color: white;
  cursor: pointer;
`;
const Input = styled.input`
  width: 30em;
  height: 2em;
  border: none;
  border-radius: 0.4em;
`;
const SignIn = styled(NavLink)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
`;
const Cart = styled(NavLink)`
  color: white;
  margin-right: 1em;
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
`;
export default Header;
