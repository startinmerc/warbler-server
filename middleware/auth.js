require('dotenv').config();
const jwt = require("jsonwebtoken");

// Make sure user is logged in
exports.loginRequired = function(req,res,next){
	try {
		// Auth comes as "Authorization:Bearer token...."
		const token = req.headers.authorization.split(" ")[1];
		// Verify returns boolean value decoded
		jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
			if(decoded){
				return next();
			} else {
				return next({
					status: 401,
					message: "Please log in first"
				});
			}
		});
	} catch(err){
		return next({
			status: 401,
			message: "Please log in first"			
		});
	}
};

// Make sure user is correct
exports.ensureCorrectUser = function(req,res,next){
	try {
		// Split auth
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
			// If decoded and decoded id matches session id
			if(decoded && decoded.id === req.params.id) {
				return next();
			} else {
				return next({
					status: 401,
					message: "Unauthorized"
				})
			}
		})
	} catch(err) {
		return next({
			status: 401,
			message: "Unauthorized"
		});
	}
};
