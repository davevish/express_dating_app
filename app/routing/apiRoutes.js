var friendsList = require("../data/friends.js");

module.exports = function (app) {
	app.get("/api/friends", function (req, res) {
		res.json(friendsList);
	});

	app.post("/api/friends", function (req, res) {
		var newUser = req.body;
		friendsList.push(newUser);
		res.json(newUser)
	});
};
