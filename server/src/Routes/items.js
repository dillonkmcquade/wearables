const { Router } = require("express");
const { getAllItems } = require("../handlers/getAllItems");
const { getItemsByName } = require("../handlers/getItemsByName");
const { getAllItemNames } = require("../handlers/getAllItemNames");

const itemRouter = Router();

itemRouter
  .get("/", getAllItems)
  .get("/:name", getItemsByName)
  .get("/names", getAllItemNames);

module.exports = itemRouter;
