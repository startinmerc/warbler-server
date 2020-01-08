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
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
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
		// if password hased, pass
		if(!this.isModified("password")){
			return next();
		}
		// encrypt supplied password
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		// replace unencrypted password
		return next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
	try {
		// compare supplied password with stored
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
