const express = require('express')
const app = express();
const cors = require('cors'); // Import the cors middleware

app.use(cors()); // Enable CORS for all routes

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

// connect mongodb database
require('./server/database/database')();

// calling routes
app.use('/', require('./server/routes/employeeRoute'));

app.listen(3000, () => console.log(`Server is stated on http://localhost:3000`));