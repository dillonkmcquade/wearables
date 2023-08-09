// Provides company context across application, caches items in localStorage on initial render
import { createContext, useState, useEffect } from "react";

export const CompanyContext = createContext(null);

export const CompanyProvider = ({ children }) => {
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companies, setCompanies] = useState(() => {
    // This identifies the user by its cartId
    const companies = window.localStorage.getItem("companies");
    if (companies) {
      return JSON.parse(companies);
    }
    return null;
  });
  useEffect(() => {
    if (!companies) {
      const fetchData = async function () {
        try {
          const request = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/companies?start=0&limit=74`,
          );
          const { data } = await request.json();
          window.localStorage.setItem("companies", JSON.stringify(data));
          setCompanies(data);
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchData();
    }
  }, []);
  return (
    <CompanyContext.Provider
      value={{ companies, loadingCompanies, setLoadingCompanies }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
