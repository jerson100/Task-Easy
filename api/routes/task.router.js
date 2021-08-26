const express = require("express");
const { processError } = require("../middlewares/processError");
const { validationSchema } = require("../middlewares/validationSchema");
const { CreateTaskSchema } = require("../models/taks/taks.validation");
const { createTask } = require("../models/taks/task.controller");
//con esta instancia tenemos un sistema completo de middlewares y redireccionamiento completo.
const Router = express.Router();

Router.post(
  "/",
  validationSchema(CreateTaskSchema, "body"),
  processError(async (req, res) => {
    await createTask(req.body);
    res.status(201).send();
  })
);

module.exports = Router;
