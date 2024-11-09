const express = require("express");

// Imported functions from task controller
const {
  find,
  insert,
  complete,
  remove,
} = require("../controllers/Task.controller");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/all", find);

router.post("/add", insert);

router.patch("/complete/:id", complete);

router.delete("/remove/:id", remove);

module.exports = router;
