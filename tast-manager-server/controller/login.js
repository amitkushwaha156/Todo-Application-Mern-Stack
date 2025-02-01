const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function UserLogin(req, res) {
  try {
    const { password, email } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide both email and password',
        error: true,
      });
    }

    // Retrieve the user from the database using email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
      });
    }

    // Check if the password is valid
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: 'Invalid password',
        error: true,
      });
    }

    // Generate a JWT token
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    // Configure cookie options
    const cookiesOption = {
      httpOnly: true, // Prevent access to cookies via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure flag in production
      sameSite: 'Strict', // Optional, depending on your requirements
    };

    // Send the token in a cookie and respond
    return res
      .cookie('token', token, cookiesOption)
      .status(200)
      .json({
        message: 'Login successful',
        token: token, // Optionally return the token
        success: true,
        data:user
      });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

module.exports = UserLogin;
