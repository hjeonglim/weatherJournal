// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//send data to /all
app.get('/all', function(req, res) {
  
    console.log(projectData);
    res.send(projectData)
})

// post data at /addweather
app.post('/addWeather', addData);

function addData(req, res) {
    let data = req.body;
    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["feel"] = data.feel;
    console.log(projectData);
    //no return but notify the message that request has received
    res.send({okay: "worked"});
}    

// Setup Server
const port = 8000;

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost ${port}`);
}
