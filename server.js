// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');


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

app.get('/get', (req, res) => {
  res.status(200).send(projectData);
})

app.post('/post', bodyParser.json(), (req, res) => {
  const { temperature, date, userResponse } = req.body;
  console.log('Data payload received:', req.body);
  
  if (temperature && date && userResponse) {
    projectData = {
      temperature,
      date,
      userResponse
    }
    res.status(202).send();
  } else {
    res.status(403).send({
      error: 'Invalid data provided. Please provide temperature, date and userResponse data'
    })
  }
})


// Setup Server
app.listen(config.port, () => {
  console.log('Server is running on port %s - press Crtl+C to terminate', config.port)
})