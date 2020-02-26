const express = require("express");

// "/api/users/:user_id/..."
// mergeParams preserves req.params from parent router
const router = express.Router({ mergeParams: true });

// Import handlers
const { 
	createMessage,
	getMessage,
	deleteMessage,
	editMessage
} = require("../handlers/messages");

// Root route
router.route("/")
	// Create new message
	.post(createMessage);

// Specific Message routes
router.route("/:message_id")
	// Get specific message
	.get(getMessage)
	// Delete specific message
	.delete(deleteMessage)
	// Edit specific message
	.put(editMessage);

module.exports = router;
