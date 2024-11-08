const express = require("express");

const {
  find,
  insert,
  complete,
  remove,
} = require("../controllers/Task.controller");

const router = express.Router();

router.get("/all", find);

router.post("/add", insert);

router.patch("/complete/:id", complete);

router.delete("/remove/:id", remove);
