const { secretKey, expireKey } = require("../config/env");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const cookieOptions = {
  httpOnly: true,
  secure: true,  // Set true for production if you're using HTTPS
  sameSite: 'None',  // Required for cross-origin requests (especially with CORS)
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "No account found. Please create one." });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const token = JWT.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey,
      { expiresIn: expireKey }
    );

    // Set the authToken cookie with the JWT token
    res.cookie("authToken", token, cookieOptions);

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Email must be unique." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = JWT.sign(
      { email: newUser.email, id: newUser._id },
      secretKey,
      { expiresIn: expireKey }
    );

    // Set the authToken cookie with the JWT token
    res.cookie("authToken", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("authToken", "", { maxAge: 0 }); 
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user); 
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, register, logout, checkAuth };
