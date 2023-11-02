// Provides item context across application, caches items in localStorage on initial render
// Must manually set loading to false wherever used
import { createContext, useState, useEffect, useCallback } from "react";

export const ItemContext = createContext(null);

export const ItemProvider = ({ children }) => {
  const [loadingItems, setLoadingItems] = useState(true);
  const [items, setItems] = useState(() => {
    // This identifies the user by its cartId
    const cachedItems = window.localStorage.getItem("items");
    if (cachedItems) {
      return JSON.parse(cachedItems);
    } else {
      return null;
    }
  });
  const fetchData = useCallback(async function () {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/items?start=0&limit=348`,
      );
      const response = await request.json();
      if (response.status === 200) {
        window.localStorage.setItem("items", JSON.stringify(response.data));
        setItems(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }, []);
  useEffect(() => {
    if (!items) {
      fetchData();
    }
  }, [fetchData, items]);
  return (
    <ItemContext.Provider
      value={{ items, loadingItems, setLoadingItems, fetchData }}
    >
      {children}
    </ItemContext.Provider>
  );
};
