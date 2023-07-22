import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./UserContext";
import { ItemProvider } from "./ItemContext";
import { CompanyProvider } from "./CompanyContext";

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
  document.getElementById("root")
);
