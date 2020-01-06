require('dotenv').load();
const jwt = require("jsonwebtoken");

// make sure user is logged in
exports.loginRequired = function(req,res,next){
	try {
		const token = req.headers.authoriszation.split(" ")[1]
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
		next({
			status: 401,
			message: "Please log in first"			
		});
	}
};

// make sure user is correct
exports.ensureCorrectUser = function(req,res,next){

}