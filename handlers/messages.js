const db = require("../models");

exports.createMessage = async function(req,res,next){
	try {
		// Create new Message from req.body & logged in user
		let message = await db.Message.create({
			text: req.body.text,
			user: req.params.id
		});
		// Find user in db
		let foundUser = await db.User.findById(req.params.id);
		// Add message to user's message array
		foundUser.messages.push(message.id);
		// Save updated user
		await foundUser.save();
		// Find new message in db
		let foundMessage = await db.Message.findById(message._id)
			// Populate user(author) object of message
			.populate("user", {
				username: true,
				profileImageUrl: true
			});
		// Return new message & status
		return res.status(200).json(foundMessage);
	// Catch errors
	} catch(err) {
		return next(err);
	}
};

exports.getMessage = async function(req,res,next){
	try {
		let message = await db.Message.findById(req.params.message_id);
		return res.status(200).json(message);
	} catch(err) {
		return next(err);
	}
};

exports.editMessage = async function(req,res,next){
	try {
		let newText = req.body.text;
		let foundMessage = await db.Message.findByIdAndUpdate(
			req.params.message_id, {text: newText, isEdited: true}, function(err,updatedMessage){
				if(err){
					return err;
				} else {
					return updatedMessage;
				}
			}
		);
		return res.status(200).json(foundMessage);
	} catch(err) {
		return next(err);
	}
};

exports.deleteMessage = async function(req,res,next){
	try {
		let foundMessage = await db.Message.findById(req.params.message_id);
		await foundMessage.remove();
		return res.status(200).json(foundMessage);
	} catch(err) {
		return next(err);
	}
};
