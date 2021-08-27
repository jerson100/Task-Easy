const Task = require("./task.model");

const createTask = async ({ title, description, color, isComplete }) => {
  const newTask = await new Task({
    title: title,
    description: description,
    color: color,
    isComplete: isComplete,
  });
  await newTask.save();
  return newTask;
};

const findTasks = async (query = {}, proyection = {}) => {
  return await Task.find(query, proyection);
};

const allTasks = async () => {
  return await findTasks();
};

const getTaskById = async (id) => {
  return await Task.findOne({ _id: id });
};

const getTaskByTitle = async (title) => {
  return await Task.findOne({ title: title });
};

const deleteTask = async (id) => {
  return await Task.deleteOne({ _id: id });
};

const updateTask = async (id, obj = {}) => {
  return await Task.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true });
};

module.exports = {
  createTask,
  findTasks,
  allTasks,
  getTaskByTitle,
  getTaskById,
  deleteTask,
  updateTask,
};
