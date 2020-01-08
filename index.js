require("dotenv").config();
const express = require("express");
const app = express();
// cross origin override to transfer api data
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");

// Import Routes
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");

// Middleware
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 8081;

// Models
const db = require("./models");

// Express Config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// External Routes
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
	loginRequired,
	ensureCorrectUser,
	messagesRoutes
);

// GET Route
app.get("/api/messages", loginRequired, async function(req,res,next){
	try {
		let messages = await db.Message.find()
			.sort({ createdAt: "desc" })
			.populate("user", {
				username: true,
				profileImageUrl: true
			});
		return res.status(200).json(messages);
	} catch(err){
		return next(err);
	}
});

// 404 Route
app.use(function(req,res,next){
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Use custom error formatting
app.use(errorHandler);

// Start App
app.listen(PORT, function(){
	console.log(`Server running on port ${PORT}`);
});
