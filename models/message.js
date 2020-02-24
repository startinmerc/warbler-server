const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxLength: 160
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

// Before removing message
messageSchema.pre('remove', async function(next){
	try {
		// Find author
		let user = await User.findById(this.user);
		// Remove message ref in author.messages
		user.messages.remove(this.id);
		// Wait to save
		await user.save();
		// On you go
		return next();
	// Catch errors
	} catch(err) {
		return next(err);
	}
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;
