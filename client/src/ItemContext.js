// Provides item context across application, caches items in localStorage on initial render
// Must manually set loading to false wherever used
import { createContext, useState, useEffect } from "react";

export const ItemContext = createContext(null);

export const ItemProvider = ({ children }) => {
  const [loadingItems, setLoadingItems] = useState(true);
  const [items, setItems] = useState(() => {
    // This identifies the user by its cartId
    const items = window.localStorage.getItem("items");
    if (items) {
      return JSON.parse(items);
    }
    return null;
  });
  const fetchData = async function () {
    try {
      const request = await fetch("/items?start=0&limit=348");
      const { data } = await request.json();
      window.localStorage.setItem("items", JSON.stringify(data));
      setItems(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (!items) {
      fetchData();
    }
  }, []);
  return (
    <ItemContext.Provider
      value={{ items, loadingItems, setLoadingItems, fetchData }}
    >
      {children}
    </ItemContext.Provider>
  );
};
