const Joi = require("joi");

const CreateTaskSchema = Joi.object().keys({
  title: Joi.string().trim().min(1).max(40).required(),
  description: Joi.string().trim().max(500),
  color: Joi.string().trim().min(3).required(),
  isComplete: Joi.boolean().default(false),
});

module.exports = {
  CreateTaskSchema,
};
