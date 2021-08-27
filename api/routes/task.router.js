const express = require("express");
const { processError } = require("../middlewares/processError");
const isExists = require("../middlewares/task/isExists");
const {
  validationSchema,
  validateObjectIdSchema,
} = require("../middlewares/validationSchema");
const {
  CreateTaskSchema,
  PatchTaskSchema,
  PutTaskSchema,
} = require("../models/task/task.validation");
const TaskController = require("../models/task/task.controller");
const { NotFoundTaskError } = require("../models/task/task.error");
//con esta instancia tenemos un sistema completo de middlewares y redireccionamiento completo.
const Router = express.Router();

Router.route("/")
  .get(
    processError(async (req, res) => {
      const tasks = await TaskController.allTasks();
      res.json({ data: tasks });
    })
  )
  .post(
    validationSchema(CreateTaskSchema, "body"),
    isExists("body", "title"),
    processError(async (req, res) => {
      await TaskController.createTask(req.body);
      res.status(201).send();
    })
  );

Router.route("/:id")
  .get(
    validationSchema(validateObjectIdSchema(), "params"),
    processError(async (req, res) => {
      const task = await TaskController.getTaskById(req.params.id);
      if (!task) {
        throw new NotFoundTaskError();
      }
      res.json({ data: task });
    })
  )
  .delete(
    validationSchema(validateObjectIdSchema(), "params"),
    processError(async (req, res) => {
      await TaskController.deleteTask(req.params.id);
      res.status(204).json();
    })
  )
  .patch(
    validationSchema(validateObjectIdSchema(), "params"),
    validationSchema(PatchTaskSchema, "body"),
    processError(async (req, res) => {
      const updatedTask = await TaskController.updateTask(
        req.params.id,
        req.body
      );
      if (!updatedTask) {
        throw new NotFoundTaskError(
          "La tarea que intenta actualizar no existe"
        );
      }
      res.status(200).json({ data: updatedTask });
    })
  )
  .put(
    validationSchema(validateObjectIdSchema(), "params"),
    validationSchema(PutTaskSchema, "body"),
    processError(async (req, res) => {
      const updatedTask = await TaskController.updateTask(
        req.params.id,
        req.body
      );
      if (!updatedTask) {
        throw new NotFoundTaskError(
          "La tarea que intenta actualizar no existe"
        );
      }
      res.status(200).json({ data: updatedTask });
    })
  );

module.exports = Router;
