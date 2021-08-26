const { getTaskByTitle } = require("../../models/taks/task.controller");
const { ExistsTaskException } = require("../../models/taks/task.error");

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
