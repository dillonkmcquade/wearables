const router = require("express").Router();
const { getAllItems } = require("../handlers/getAllItems");
const { getItemsByName } = require("../handlers/getItemsByName");
const { getAllCompanies } = require("../handlers/getAllCompanies");
const { getOneCompany } = require("../handlers/getOneCompany");
const { deleteItemFromCart } = require("../handlers/deleteItemFromCart");
const { updateItemFromCart } = require("../handlers/updateItemFromCart");
const { addItemToCart } = require("../handlers/addItemToCart");
const { checkout } = require("../handlers/checkout");
const { signup } = require("../handlers/signup");
const { signin } = require("../handlers/signin.js");
const { getCart } = require("../handlers/getCart");
const { getAllItemNames } = require("../handlers/getAllItemNames");

//Routes for handlers
router.get("/items", getAllItems);
router.get("/items/:name", getItemsByName);
router.get("/itemnames", getAllItemNames);
router.get("/companies", getAllCompanies);
router.get("/companies/:_id", getOneCompany);
router.get("/cart/:_id", getCart);
router.post("/checkout", checkout);
router.post("/signup", signup);
router.post("/checkout", checkout);
router.post("/signin", signin);
router.patch("/cart/:cartId/delete", deleteItemFromCart);
router.patch("/update-item-from-cart/:cartId", updateItemFromCart);
router.patch("/add-item-to-cart/:cartId", addItemToCart);

module.exports = router;
