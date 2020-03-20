const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		maxLength: 50
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
	},
	bio: {
		type: String,
		maxLength: 160
	},
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message"
		}
	]
});

userSchema.pre("save", async function(next){
	try {
		// Check if password unchanged
		if(!this.isModified("password")){
			return next();
		}
		// If changed, encrypt new password
		let hashedPassword = await bcrypt.hash(this.password, 10);
		// Replace unencrypted password
		this.password = hashedPassword;
		// On you go
		return next();
	// Catch errors
	} catch (err) {
		return next(err);
	}
});

// Assign function to check password
userSchema.methods.comparePassword = async function(candidatePassword, next){
	try {
		// Compare hashed supplied password with stored
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		// Return boolean of matched password
		return isMatch;
	// Catch errors
	} catch (err) {
		return next(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
