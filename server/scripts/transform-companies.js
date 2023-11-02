const companies = require("../data/companies.json");
const countries = require("../data/countries.json");
const fs = require("fs");

const transformed = companies.map((company) => {
  const country_code = countries.find(
    (country) => country.country === company.country,
  );
  return {
    id: company._id,
    country_code: country_code.id,
    name: company.name,
    url: company.url,
  };
});

fs.writeFileSync(
  "../data/companies-transformed.json",
  JSON.stringify(transformed),
);
