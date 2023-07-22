import { Routes, BrowserRouter, Route } from "react-router-dom";
import { styled } from "styled-components";

import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage/HomePage";
import Categories from "./Categories";
import Cart from "./Cart/Cart";
import Login from "./Login";
import CheckoutPage from "./Checkout/CheckoutPage";
import ItemDetails from "./ItemDetails";
import Signup from "../Signup";
import ThankYou from "./ThankYou/ThankYou";
import Header from "./Header/Header";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/confirmation/:confirmationId"
              element={<ThankYou />}
            />
            <Route path="/*" element={<HomePage />} />
            <Route path="/items/:id" element={<ItemDetails />} />
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

const Main = styled.div``;
const Footer = styled.div``;

export default App;
