const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkEmailIdExists = async (req, res) => {
  const { emailId } = req.body;
  const isEmailIdThere = await User.findOne({ emailId });
  if (isEmailIdThere) {
    res.status(StatusCodes.OK).json({ doesExists: true });
  } else {
    res.status(StatusCodes.OK).json({ doesExists: false });
  }
};

const checkUserNameExists = async (req, res) => {
  const { userName } = req.body;
  const isUserNameThere = await User.findOne({ userName });
  if (isUserNameThere) {
    res.status(StatusCodes.OK).json({ doesExists: true });
  } else {
    res.status(StatusCodes.OK).json({ doesExists: false });
  }
};

const createUser = async (req, res) => {
  const userDetails = req.body;
  const salt = await bcrypt.genSalt();
  userDetails.password = await bcrypt.hash(userDetails.password, salt);
  const user = await User.create(userDetails);
  if (user) {
    res.status(StatusCodes.CREATED).json({ user });
  } else {
    throw new BadRequestError("Something went wrong");
  }
};

const logInUser = async (req, res) => {
  const { emailId, password } = req.body;
  const user = await User.findOne({ emailId });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const token = jwt.sign(user._id, process.env.JWT_TOKEN);
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({ user: user._id });
    }
  }
};

const logOutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
};

module.exports = {
  checkEmailIdExists,
  checkUserNameExists,
  createUser,
  logInUser,
  logOutUser,
};
