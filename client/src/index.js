import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./context/UserContext";
import { ItemProvider } from "./context/ItemContext";
import { CompanyProvider } from "./context/CompanyContext";

ReactDOM.render(
  <React.StrictMode>
    <CompanyProvider>
      <ItemProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ItemProvider>
    </CompanyProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
