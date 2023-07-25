import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./context/UserContext";
import { ItemProvider } from "./context/ItemContext";
import { CompanyProvider } from "./context/CompanyContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <CompanyProvider>
    <ItemProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ItemProvider>
  </CompanyProvider>,
  document.getElementById("root"),
);
