require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Routes
const taskRoutes = require("./routes/Task.routes");
const userRoutes = require("./routes/User.routes");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to database and listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
