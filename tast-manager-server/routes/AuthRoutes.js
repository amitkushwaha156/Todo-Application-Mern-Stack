const express = require("express");
const registerUser = require("../Auth/registerUser");

const UserLogin = require("../Auth/login");
const logout = require("../Auth/logout");
const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

router.post("/login", UserLogin);

router.get("/logout", logout);

module.exports = router;
