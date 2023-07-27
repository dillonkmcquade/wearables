import { useContext, useState, useEffect } from "react";
import { styled } from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMagnifyingGlass, HiOutlineUser } from "react-icons/hi2";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import CatBurger from "./CatBurger";
import { UserContext } from "../../context/UserContext";
import { ItemContext } from "../../context/ItemContext";
import Result from "./Result";

const Header = () => {
  const { items } = useContext(ItemContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setResults([]);
  }, [location]);

  const logout = function () {
    setCurrentUser(null);
    navigate("/");
  };
  const handleSignIn = function () {
    if (currentUser) {
      logout();
    } else {
      navigate("/signin");
    }
  };

  const handleSearch = function (event) {
    if (event.target.value.length > 2) {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase()),
      );
      filteredItems.sort(
        (a, b) =>
          a.name.indexOf(event.target.value) -
          b.name.indexOf(event.target.value),
      );
      setResults(filteredItems.slice(0, 10));
    } else {
      setResults([]);
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title to="/">Wearables</Title>
        <Search>
          <CatBurger />
          <Input
            type="text"
            onChange={handleSearch}
            placeholder="What do you need?"
          />
          <Results $display={!results.length && "none"}>
            {results.length !== 0 &&
              results.map((result) => (
                <Result
                  key={result._id}
                  data={result}
                  handler={() => navigate(`/items/${result._id}`)}
                />
              ))}
          </Results>
          <SearchIcon size={25} />
        </Search>
        <Cart to={currentUser ? "/cart" : "/"}>
          <ShoppingCart>
            <AiOutlineShoppingCart size={25} />
            {currentUser && <Badge>{currentUser.cartQty}</Badge>}
          </ShoppingCart>
        </Cart>
        <SignIn onClick={handleSignIn}>
          <HiOutlineUser size={25} />
          <span>{currentUser ? "Log out" : "Log in"}</span>
        </SignIn>
      </Content>
    </Wrapper>
  );
};

const Results = styled.div`
  display: ${(props) => props.$display || "block"};
  position: absolute;
  width: 25em;
  background-color: white;
  top: 45px;
  border-radius: 0 0 0.4em 0.4em;
  border: 1px solid gray;
`;

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
`;
const SearchIcon = styled(HiMagnifyingGlass)`
  color: white;
  cursor: pointer;
`;
const Input = styled.input`
  width: 30em;
  height: 2em;
  border: none;
  border-radius: 0.2em;
  padding: 0 0.3rem;
  outline: none;
`;
const SignIn = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  &:hover {
    color: gray;
  }
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

const ShoppingCart = styled.div`
  height: 25px;
  width: 25px;
`;
const Badge = styled.div`
  text-align: center;
  position: relative;
  top: -25px;
  right: -20px;
  height: 10px;
  width: 10px;
  font-size: 0.5rem;
  background-color: white;
  color: black;
  border-radius: 2.5px;
`;
export default Header;
