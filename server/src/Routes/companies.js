const { Router } = require("express");
const { getAllCompanies } = require("../handlers/getAllCompanies");
const { getOneCompany } = require("../handlers/getOneCompany");

const companyRouter = Router();

companyRouter.get("/", getAllCompanies).get("/:_id", getOneCompany);
module.exports = companyRouter;
