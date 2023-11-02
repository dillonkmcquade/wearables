const items = require("../data/items.json");
const categories = require("../data/categories.json");
const body_locations = require("../data/body-locations.json");
const fs = require("fs");

const transformed = items.map((item) => {
  const category = categories.find(
    (category) => category.category === item.category,
  );
  const body_location = body_locations.find(
    (body_location) => body_location.body_location === item.body_location,
  );
  return {
    id: item._id,
    price: Number(item.price.split("$")[1]),
    company_id: item.companyId,
    name: item.name,
    body_location: body_location.id,
    num_in_stock: item.numInStock,
    category_id: category.id,
    image_src: item.imageSrc,
  };
});

fs.writeFileSync("../data/items-transformed.json", JSON.stringify(transformed));
