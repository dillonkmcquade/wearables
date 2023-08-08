"use strict";

const { collections } = require("../services/database.service");

const updateItemFromCart = async (request, response) => {
  //_id is the item id
  //updateQty is the new amount of items chosen by the user in the FE
  const { _id, updateQty } = request.body;

  //get the cart Id from the local storage on the FE
  const { cartId } = request.auth;

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
  if (!updateQty) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item quantity" });
  }

  try {
    const { carts } = collections;
    //getting the array of items from the user`s cart
    const cartData = await carts.findOne({ _id: cartId });
    !cartData &&
      response.status(404).json({ status: 404, message: "Not Found" });
    const itemsArray = cartData.cartItems;

    const containsItem = itemsArray.some((item) => item._id === _id);

    if (containsItem) {
      //find the quantity already in the cart
      const cartItem = await carts.findOne({
        _id: cartId,
        "cartItems._id": _id,
      });
      !cartItem &&
        response
          .status(404)
          .json({ status: 404, message: "Cart item not Found" });

      if (updateQty !== cartItem.qty) {
        const query = { _id: cartId };

        const updateDocument = {
          $set: { "cartItems.$[i].qty": updateQty },
        };

        const options = {
          arrayFilters: [
            {
              "i._id": _id,
            },
          ],
        };

        const resultUpdateItems = await carts.updateOne(
          query,
          updateDocument,
          options,
        );
        //testing block
        if (!resultUpdateItems.matchedCount) {
          response
            .status(404)
            .json({ status: 404, message: "No item found in the cart" });
        } else if (!resultUpdateItems.modifiedCount) {
          response.status(409).json({
            status: 409,
            message: "Modification equal to pre-existent data",
          });
        } else {
          response
            .status(200)
            .json({ status: 200, message: "Item added to the cart" });
        }
      } else {
        response
          .status(409)
          .json({ status: 409, message: "The quantity is still the same" });
      }
    }
  } catch (err) {
    console.log(err.message);
    response.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = { updateItemFromCart };
