const Todo = require("../models/todo.model");

const getTask = (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

const getTaskById = (req, res) => {
  const paramId = req.params.id;
  Todo.findById(paramId)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

const addTask = (req, res) => {
  const { title, description, done } = req.body;
  if (!title || !description || done === undefined) {
    return res.send("Error!");
  }
  const task = new Todo({ title, description, done });
  task.save().then(() => console.log("Task added"));
  res.send("Task added!");
};

const deleteTask = (req, res) => {
  const paramId = req.params.id;
  Todo.findByIdAndRemove(paramId)
    .then((todo) => res.send("Deleted!"))
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

const updateTask = (req, res) => {
  const paramId = req.params.id;
  const { title, description, done } = req.body;
  Todo.findByIdAndUpdate(paramId, { title, description, done })
    .then(() => res.send("Updated!"))
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

module.exports = { getTaskById, getTask, addTask, deleteTask, updateTask };
