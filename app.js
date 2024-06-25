const express = require('express')
const app = express();
const cors = require('cors'); // Import the cors middleware

app.use(cors()); // Enable CORS for all routes

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

// connect mongodb database
require('./server/database/database.js')();

// calling routes
app.use('/', require('./server/routes/employeeRoute.js'));

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

// // create an express app
// const express = require("express")
// const app = express()

// // define the first route
// app.get("/", function (req, res) {
//   res.send("<h1>Hello World!</h1>")
// })

// // start the server listening for requests
// app.listen(process.env.PORT || 3000, 
// 	() => console.log("Server is running..."));