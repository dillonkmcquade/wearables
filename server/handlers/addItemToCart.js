"use strict";
//latest version tested and working
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addItemToCart = async (request, response) => {
  //_id is the item id
  //qty is the amount of items chosen by the user in the FE
  const { _id, qty } = request.body;

  //get the cart Id from the local storage on the FE
  const { cartId } = request.params;

  if (!cartId) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing cart id" });
  }
  if (!_id) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item id" });
  }
  if (!qty) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item quantity" });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");

    //getting the array of items from the user`s cart
    const cartData = await db.collection("carts").findOne({ _id: cartId });
    !cartData &&
      response.status(404).json({ status: 404, message: "Not Found" });
    const itemsArray = cartData.cartItems;

    const containsItem = itemsArray.some((item) => item._id === _id);
    //if the cart still has none of the chosen item, add it to the cart (the chosen qty)
    //this block will be executed when first adding the item, in the item component
    if (!containsItem) {
      //get the item from items and create another similar object, but with a counter "qty" and a brand
      const originalItem = await db.collection("items").findOne({ _id: _id });
      !originalItem &&
        response
          .status(404)
          .json({ status: 404, message: "Original item not Found" });

      //get the brand from the companies collection
      const company = await db
        .collection("companies")
        .findOne({ _id: originalItem.companyId });
      !company &&
        response
          .status(404)
          .json({ status: 404, message: "Company not Found" });
      const brand = company.name;

      //this is the new object
      const newCartItem = { ...originalItem, qty: qty, brand: brand };

      //add it to the user`s cart pushing the new object to cartItems array
      const resultAddNewItem = await db
        .collection("carts")
        .updateOne({ _id: cartId }, { $push: { cartItems: newCartItem } });
      //testing block
      if (!resultAddNewItem.matchedCount) {
        response
          .status(404)
          .json({ status: 404, message: "No item found in the cart" });
      } else if (!resultAddNewItem.modifiedCount) {
        response.status(409).json({
          status: 409,
          message: "Modification equal to pre-existent data",
        });
      } else {
        response
          .status(200)
          .json({ status: 200, message: "Item added to the cart" });
      }
    } else if (containsItem) {
      response
        .status(409)
        .json({ status: 409, message: "Item already in the cart" });
    }
  } catch (err) {
    (err) => console.log(err);
    response.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { addItemToCart };
