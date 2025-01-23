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

router.get("/", getAllTasks);

router.post("/", addTask);

router.patch("/:id", toggleTaskComplete);

router.delete("/:id", removeTask);

module.exports = router;
