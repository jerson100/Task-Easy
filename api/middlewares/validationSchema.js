const Joi = require("joi");
const { SchemaValidationError } = require("../helpers/Error");

const validationSchema = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      convert: false,
    });
    if (error == null) {
      //si es válido
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      next(new SchemaValidationError(message));
      //res.status(422).json({ error: message });
    }
  };
};

// const validateObjectIdSchema = Joi.object().keys({
//   id: Joi.string()
//     .regex(/^[a-fA-F0-9]{24}$/)
//     .required(),
// });

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
