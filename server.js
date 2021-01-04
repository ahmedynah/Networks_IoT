// // Setup empty JS object to act as endpoint for all routes
// projectData = {
// };

// // Require Express to run server and routes
// const express = require('express');

// // Start up an instance of app
// const app = express();

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// const cors = require('cors');
// // const { json } = require('body-parser');
// app.use(cors());

// // Initialize the main project folder
// app.use(express.static('website'));


// // Setup Server
// const port = 8000;

// const server = app.listen( port, ()=> console.log(`Servers is on and listens on port: ${port}`));


// /**GET Route handling**/

// //Handel_GET implementation
// /**
//  * @param req the request object received 
//  * @param res the response object to convey the data
//  */

// handle_GET =  (req, res) =>{
//     res.send(projectData);
//     //console.log(projectData);
// }

// app.get("/getdata", handle_GET);


// /** POST Route handling */

// //Handel_POST implementation
// /**
//  * @param req the request object received 
//  * @param res the response object to convey the data
//  */

// handle_POST = (req, res) => {
//     console.log("in server code:",req.body);
//     projectData["gasValue"] = req.body.gasValue;
//     projectData["buzzer"] = req.body.buzzer;
//     projectData["servo"] = req.body.servo;
//     console.log("in and data = ", projectData);
// }

// app.post("/add", handle_POST);

// // Setup empty JS object to act as endpoint for all routes
// projectData = {
// };

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// const { json } = require('body-parser');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, '197.55.58.235' | 'localhost', function(){ 
    console.log("Server running on localhost port : " + port);
    })
var led = true;
  
app.post('/add',(req,res) =>{// Angular service will hit this api to toggle the led value console.log(led);
console.log("in");
res.set('Content-Type', 'text/plain');
res.send({value : !led});
led = !led;//every time we click the button value is toggled console.log("out");
console.log(req.body)
console.log(led);
})
  
app.get('/api',(req,res)=>{// used to receive data from server
// esp8266 will hit this api to get the led status 
console.log("in");// for testing purpose only 
console.log(led);// log the value of led onto console 
res.set('Content-Type', 'text/plain');// set the headers 
if(led){ res.send({value : 1});// if led is on or true, send value=1    
} else{ res.send({value : 0});//else send value = 0    
} 
console.log(led); 
console.log("out");// log the console.
})
  
//this tells the server to listen to request on port 3000
// and host can be either localhost or 192.168.43.161 '102.40.58.18' | 'localhost',
