const Task = require("../models/Task.model");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
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
  try {
    const task = await Task.create({ title });
    res.status(200).json({ task });
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
    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  toggleTaskComplete,
  removeTask,
};
