const { getTaskByTitle } = require("../../models/task/task.controller");
const { ExistsTaskException } = require("../../models/task/task.error");

const isExists = (queryParam, paramName) => async (req, res, next) => {
  const title = req[queryParam][paramName];
  const task = await getTaskByTitle(title);
  if (!task) {
    next();
  } else {
    next(new ExistsTaskException());
  }
};

module.exports = isExists;
