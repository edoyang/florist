const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);  // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password

    const newUser = new User({
      username,
      email,
      password: hashedPassword  // Store the hashed password
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already exists!" });
    } else {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email address not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Compare the hashed password
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};