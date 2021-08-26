const express = require("express");
const { processError } = require("../middlewares/processError");
const {
  validationSchema,
  validateObjectIdSchema,
} = require("../middlewares/validationSchema");
const { CreateTaskSchema } = require("../models/taks/taks.validation");
const {
  createTask,
  allTasks,
  getTask,
} = require("../models/taks/task.controller");
const { NotFoundTaskError } = require("../models/taks/task.error");
//con esta instancia tenemos un sistema completo de middlewares y redireccionamiento completo.
const Router = express.Router();

Router.route("/")
  .get(
    processError(async (req, res) => {
      const tasks = await allTasks();
      res.json({ data: tasks });
    })
  )
  .post(
    validationSchema(CreateTaskSchema, "body"),
    processError(async (req, res) => {
      await createTask(req.body);
      res.status(201).send();
    })
  );

Router.get(
  "/:id",
  validationSchema(validateObjectIdSchema(), "params"),
  processError(async (req, res) => {
    const task = await getTask(req.params.id);
    if (!task) {
      throw new NotFoundTaskError();
    }
    res.json({ data: task });
  })
);

module.exports = Router;
