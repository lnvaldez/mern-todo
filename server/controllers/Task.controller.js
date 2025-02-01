const Task = require("../models/Task.model");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get task by id
const getTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new task
const addTask = async (req, res) => {
  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  try {
    const userId = req.user._id;
    const task = await Task.create({ title, userId });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: "Task title is required.", emptyFields });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { title }, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set task as completed
const toggleTaskComplete = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    await Task.updateOne({ _id: id }, { $set: { done: !task.done } });
    res.status(200).json({ message: "Task completed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task (hard-delete)
const removeTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.deleteOne({ _id: id });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  toggleTaskComplete,
  removeTask,
};
