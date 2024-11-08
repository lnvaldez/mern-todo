const express = require("express");

const {
  find,
  insert,
  complete,
  remove,
} = require("../controllers/Task.controller");

const router = express.Router();

router.get("/", find);

router.post("/", insert);

router.patch("/:id", complete);

router.delete("/:id", remove);
