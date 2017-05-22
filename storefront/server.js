// Require the Express Module
let express = require('express');
let app = express();
const path = require('path');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Setting our Static Folder
app.use(express.static(path.join(__dirname, "./node_modules")));
app.use(express.static(path.join(__dirname, './public/dist')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
// let morgan = require("morgan");
// app.use(morgan('dev'));

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})
