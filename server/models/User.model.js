const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (username, email, password) {
  // Validation

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("Username already in use");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }
};

module.exports = mongoose.model("User", userSchema);
