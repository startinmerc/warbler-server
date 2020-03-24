const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){
	try {
		// Find user by email from req.body
		let user = await db.User.findOne({
			email: req.body.email
		});
		// Deconstruct user data to variables
		let { id, username, profileImageUrl, bio } = user;
		// Check password via middleware
		let isMatch = await user.comparePassword(req.body.password);
		// If password correct
		if (isMatch) {
			// Create JSON web token for user
			let token = jwt.sign({
				id,
				username,
				profileImageUrl,
				bio
			}, process.env.SECRET_KEY
			);
			// Return user data + auth token
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				bio,
				token
			});
		// Catch errors
		} else {
			return next({
				status: 400,
				message: "Invalid email/password"
			})
		}
	// Catch errors
	} catch(err) {
		return next({
			status: 400,
			message: "Invalid email/password"
		});
	}
};

exports.signup = async function(req,res,next){
	try {
		// Create new User from req.body
		let user = await db.User.create(req.body);
		// Deconstruct user data to variables
		let { id, username, profileImageUrl } = user;
		// Create JSON web token for user
		let token = jwt.sign(
			{
				id,
				username,
				profileImageUrl
			},
			process.env.SECRET_KEY
		);
		// Return user data + auth token
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		});
	// Catch errors
	} catch(err){
		// If user taken reply with custom message
		if(err.code === 11000){
			err.message = "Sorry, that username and/or email is taken";
		}
		// Return error & status
		return next({
			status: 400,
			message: err.message
		});
	}
};
