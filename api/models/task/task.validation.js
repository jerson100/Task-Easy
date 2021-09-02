const Joi = require("joi");

const CreateTaskSchema = Joi.object().keys({
  title: Joi.string().trim().min(1).max(40).required(),
  description: Joi.string().trim().empty("").min(1).max(500).default(""),
  color: Joi.string().trim().min(3).required(),
  isComplete: Joi.boolean().default(false),
});

const PatchTaskSchema = Joi.object().keys({
  title: Joi.string().trim().min(1).max(40),
  description: Joi.string().trim().empty("").min(1).max(500).default(""),
  color: Joi.string().trim().min(3),
  isComplete: Joi.boolean(),
});

const PutTaskSchema = Joi.object().keys({
  title: Joi.string().trim().min(1).max(40).required(),
  description: Joi.string().trim().min(1).max(500).required(),
  color: Joi.string().trim().min(3).required(),
  isComplete: Joi.boolean().required(),
});

module.exports = {
  CreateTaskSchema,
  PatchTaskSchema,
  PutTaskSchema,
};
