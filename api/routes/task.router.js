const express = require("express");
const { processError } = require("../middlewares/processError");
//con esta instancia tenemos un sistema completo de middlewares y redireccionamiento completo.
const Router = express.Router();

Router.get(
  "/",
  processError(async (req, res) => {
    res.json({
      data: [{ name: "My first task" }],
    });
  })
);

module.exports = Router;
