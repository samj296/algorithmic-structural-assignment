require ("dotenv").config();
const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandling");


const PORT = process.env.PORT || 3000;

// importing routes



// middleware
app.use(express.json());
// for form submission
app.use(express.urlencoded({extended:false}));

// routes


//error handler
app.use(errorHandler);

// running server

app.listen(PORT,() => {
    console.log(`App is running on http://localhost:${PORT}`);
});