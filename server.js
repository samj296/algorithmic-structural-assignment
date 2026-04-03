require ("dotenv").config();
const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;

// importing routes



// middleware
app.use(express.json());
// for form submission
app.use(express.urlencoded({extended:false}));

// routes


// running server

app.listen(PORT,() => {
    console.log(`App is running on http://localhost:${PORT}`);
});