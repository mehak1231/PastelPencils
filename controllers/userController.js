const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Users = require("../models/user");

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: "7d" });
};

// Register User
const registerUser = async (req, res) => {
  const { username, password, email, phone, dob, roleid } = req.body;

  try {
    // Check existing user
    const exists = await Users.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      phone: phone || "0000000000",
      dob: dob || new Date("2000-01-01"),
      roleid: roleid || 2,
    });

    const token = createToken(newUser.userid);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        userid: newUser.userid,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        dob: newUser.dob,
        roleid: newUser.roleid,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user.userid);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        userid: user.userid,
        username: user.username,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        roleid: user.roleid,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

// Additional User Operations (Optional)
const getAllUsers = async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.update(req.body);
  res.json({ message: "User updated", user });
};

const deleteUser = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.destroy();
  res.json({ message: "User deleted" });
};

// Forgot Password - generate token and return it for EmailJS
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const token = createToken(user.userid); // Reuse the JWT token generator

    res.status(200).json({
      success: true,
      message: "Reset token generated",
      token, // This token is used in the reset link sent via EmailJS
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword
};