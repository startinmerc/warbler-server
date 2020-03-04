require('dotenv').config();

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://STM:"+process.env.STM+"@cluster0-c9k9l.mongodb.net/warbler?retryWrites=true&w=majority" || "mongodb://localhost:27017/warbler", {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");