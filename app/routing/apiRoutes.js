var friendsList = require("../data/friends.js");

module.exports = function (app) {
	app.get("/api/friends", function (req, res) {
		res.json(friendsList);
	});

	app.post("/api/friends", function (req, res) {
		var newUser = req.body;

		var bestFriend = {};

		var largestDifference = 40;

		var smallesDifference;

		for (var i=0; i < friendsList.length; i++) {
			var difference = 0;
			for (var j = 0; j < friendsList[i].scores.length; i++) {
                difference += Math.abs(friendsList[i].scores[j] - newUser.scores[j]);
            }
            	if(difference < largestDifference){
				smallesDifference = difference;
				bestFriend = {};
				bestFriend = friendsList[i];
				}
			}

		friendsList.push(newUser);
		res.json(newUser)
	})
};
