// FileName: index.js
// Import express
let express = require('express');
// Import body parser
let bodyParser = require('body-parser');
// Import mongoose
let mongoose = require('mongoose');

// Import blockly router
let blocklyRoutes = require('./routes/blockly-routes');

// Compress routes
var compression = require('compression');
// protect from well known vulnerabilities with helmet
var helmet = require('helmet');

// Initialize the app
let app = express();

app.use(helmet());
app.use(compression()); //Compress all routes
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ type: 'application/*+json' }));


// connect to Mongoose and set connection variable
// Depricate: mongoose.connect();
// var dev_db_url = 'mongodb://localhost/dwenguinoblockly'
var dev_db_url = 'mongodb+srv://gauthier:Neaissem135@cluster0-fistj.azure.mongodb.net/dwbl?retryWrites=true&w=majority'
// var mongoDB = process.env.MONGODB_URI || dev_db_url;
var mongoDB = dev_db_url;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
})
var db = mongoose.connection;

if (!db){
    console.log("Error connecting to db");
} else {
    console.log("db connection succesfull");
}

// Use blockly routes for the app
app.use('/', blocklyRoutes);
// Add default route
app.get("/", (req, res) => res.send('Welcome to blockly'));
// Setup static file serving
app.use('/dwenguinoblockly', express.static("../Blockly-for-Dwenguino"));

// Setup server port
var port = process.env.PORT || 12032;
// Launch app to listen to specified port
let server = app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});


// Launch a browser window
// const ChromeLauncher = require('chrome-launcher');
// ChromeLauncher.launch({
//    startingUrl: 'http://localhost:12032/dwenguinoblockly',
//    chromeFlags: ['--star-fullscreen', '--start-maximized'],
// }).then(chrome => {
//    chrome.process.on('close', (code) => {
//         console.log("browser window closed, closing application");
//         server.close();
//         process.exit();
//    });
// });
