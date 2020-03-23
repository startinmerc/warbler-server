const db = require("../models");

exports.getUser = async function(req,res,next){
	try {
		let user = await db.User.findById(req.params.user_id);
		return res.status(200).json(user);
	} catch(err) {
		return next(err);
	}
};

exports.getAllUsers = async function(req,res,next){
	try {
		let users = await db.User.find();
		return res.status(200).json(users);
	} catch(err) {
		return next(err);
	}
}

exports.editUser = async function(req,res,next){
	try {
		let newUser = req.body;
		return res.status(200).json(newUser);
	} catch(err) {
		return next(err);
	}
};
