"use strict";

const { collections } = require("../services/database.service");

//latest version tested and working
//
const addItemToCart = async (request, response) => {
  //_id is the item id
  //qty is the amount of items chosen by the user in the FE
  const { _id, qty } = request.body;

  //get the cart Id from the local storage on the FE
  const user = request.auth;

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

  try {
    const { carts, items, companies } = collections;
    //getting the array of items from the user`s cart
    const cartData = await carts.findOne({ _id: user.cartId });
    if (!cartData) {
      return response.status(404).json({ status: 404, message: "Not Found" });
    }
    const itemsArray = cartData.cartItems;

    const containsItem = itemsArray.some((item) => item._id === _id);
    //if the cart still has none of the chosen item, add it to the cart (the chosen qty)
    //this block will be executed when first adding the item, in the item component
    if (!containsItem) {
      //get the item from items and create another similar object, but with a counter "qty" and a brand
      const originalItem = await items.findOne({ _id });
      if (!originalItem) {
        return response
          .status(404)
          .json({ status: 404, message: "Original item not Found" });
      }

      //get the brand from the companies collection
      const company = await companies.findOne({ _id: originalItem.companyId });
      if (!company) {
        response
          .status(404)
          .json({ status: 404, message: "Company not Found" });
      }
      const brand = company.name;

      //this is the new object
      const newCartItem = { ...originalItem, qty: qty, brand: brand };

      //add it to the user`s cart pushing the new object to cartItems array
      const resultAddNewItem = await carts.updateOne(
        { _id: user.cartId },
        { $push: { cartItems: newCartItem } },
      );
      //testing block
      if (!resultAddNewItem.matchedCount) {
        return response
          .status(404)
          .json({ status: 404, message: "No item found in the cart" });
      } else if (!resultAddNewItem.modifiedCount) {
        return response.status(409).json({
          status: 409,
          message: "Modification equal to pre-existent data",
        });
      } else {
        return response
          .status(200)
          .json({ status: 200, message: "Item added to the cart" });
      }
    } else if (containsItem) {
      return response
        .status(409)
        .json({ status: 409, message: "Item already in the cart" });
    }
  } catch (err) {
    console.log(err.message);
    return response.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = { addItemToCart };
