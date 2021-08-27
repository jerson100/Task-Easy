const Joi = require("joi");
const { SchemaValidationError } = require("../helpers/Error");

const validationSchema = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      convert: false,
    });
    if (error == null) {
      req[property] = { ...req[property], ...value };
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      next(new SchemaValidationError(message));
    }
  };
};

const validateObjectIdSchema = (paramName = "id") => {
  return Joi.object().keys({
    [paramName]: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required(),
  });
};

module.exports = {
  validationSchema,
  validateObjectIdSchema,
};
