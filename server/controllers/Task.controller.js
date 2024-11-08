const Task = require("../models/Task.model");
const mongoose = require("mongoose");

// Get all tasks
const find = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new task
const insert = async (req, res) => {
  const title = req.body;
  try {
    await Task.create(title);
    res.status(200).json({ message: "Task created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set task as completed
const complete = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.updateOne({ _id: id }, { $set: { done: true } });
    res.status(200).json({ message: "Task completed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task (hard-delete)
const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.deleteOne(_id);
    res.status(200).json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  find,
  insert,
  complete,
  remove,
};
