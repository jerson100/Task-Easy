const Task = require("./task.model");

const createTask = async ({ title, description, color }) => {
  const newTask = await new Task({
    title: title,
    description: description,
    color: color,
  });
  await newTask.save();
  return newTask;
};

module.exports = { createTask };
