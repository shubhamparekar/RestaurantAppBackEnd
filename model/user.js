const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "The username is required"],
    unique: [true, "The username is unavailable"],
  },
  emailId: {
    type: String,
    required: [true, "The emailId is required"],
    unique: [true, "The emailId already exists"],
    lowercase: true,
    validate: [isEmail, "Enter a validate emailId"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    minlength: [6, "Minimum length of the password must 6"],
  },
});

module.exports = mongoose.model("User", UserSchema);
