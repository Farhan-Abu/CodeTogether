// controllers/authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = generateToken(newUser);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.json({ msg: 'Registration successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logout successful' });
};

module.exports = {
  register,
  login,
  logout,
};
