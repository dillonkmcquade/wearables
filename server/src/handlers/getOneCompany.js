/*
Retrieves one company from database by id 
*/

"use strict";

const { collections } = require("../services/database.service");

const getOneCompany = async (request, response) => {
  const { _id } = request.params;
  if (!_id) {
    return response.status(400).json({
      status: 400,
      data: {
        _id: _id || "Missing Params",
        someParam: someParam || "Missing someParam",
        anotherParam: anotherParam || "Missing anotherParam",
        somethingElse: somethingElse || "Missing somethingElse",
      },
    });
  }

  try {
    const { companies } = collections;
    const resultGetOne = await companies.findOne({ _id: parseInt(_id) });

    resultGetOne
      ? response.status(200).json({ status: 200, data: resultGetOne })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ status: 500, data: "Server error" });
  }
};

module.exports = { getOneCompany };
