const express = require('express');
const registerUser = require('../controller/registerUser');

const UserLogin = require('../controller/login');
const logout = require('../controller/logout');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

 router.post("/login", UserLogin);

 router.get("/logout", logout);


module.exports = router;
