const express = require("express");

// Imported functions from task controller
const {
  getAllTasks,
  addTask,
  toggleTaskComplete,
  removeTask,
} = require("../controllers/Task.controller");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/all", getAllTasks);

router.post("/add", addTask);

router.patch("/complete/:id", toggleTaskComplete);

router.delete("/remove/:id", removeTask);

module.exports = router;
