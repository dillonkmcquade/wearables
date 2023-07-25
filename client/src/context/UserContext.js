// Provides user context across application for adding/deleting items and checkout
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // This identifies the user by its cartId
    const user = window.localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  });

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
