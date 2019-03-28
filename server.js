//PACKAGES
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
var path = require("path");
var cheerio = require("cheerio");
var request = require("request");

//ARTICLES AND NOTES.JS
var Articles = require("./models/Articles.js");
var Notes = require("./models/Notes.js");

// mongoose.Promise = Promise;

//PORT 3000
var PORT = process.env.PORT || 3000;

//EXPRESS
var app = express();

//USES BODY PARSER
app.use(bodyParser.urlencoded({
    extended: false
}));

//ENABLES DELETE AND PUT
app.use(methodOverride("_method"));

//STATIC CONTENT FROM PUBLIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//DATABASE CONFIG WITH MONGOOSE
var MONGODB = process.env.MONGODB_URI || "mongodb://localhost/NPRarticles";
mongoose.connect(MONGODB);
var db = mongoose.connection;

//MONGOOSE ERRORS
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

//MONGOOSE SUCCESSFUL
db.once("open", function() {
    console.log("Mongoose connection successful.");
    // Listen on PORT
    app.listen(PORT, function() {
        console.log("App running on port 3000!");
    });
});

//ROUTES IN CONTROLLERS FOLER
var routes = require("./controllers/controller.js");
app.use("/", routes);