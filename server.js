var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./app/public"));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function () {
	console.log("Listening on PORT " + PORT);
});
