const express = require("express");

// "api/auth/..."
const router = express.Router();

// Import handlers
const {
	signup, signin
} = require("../handlers/auth");

// Sign In
router.post("/signup", signup);

// Sign Up
router.post("/signin", signin);

module.exports = router;
