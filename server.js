require ("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./auth/passport");
const mongoose = require("mongoose");
const app = express();
const errorHandler = require("./middleware/errorHandling");


const PORT = process.env.PORT || 3000;
const MONOGODB_URI = process.env.MONOGODB_URI;

// importing routes



// middleware
app.use(express.json());
// for form submission
app.use(express.urlencoded({extended:false}));



app.use(
    session({
        secret: process.env.Session_Secret || "dev_secret_placeholder",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());


//error handler
app.use(errorHandler);

// ----------- end of middleware------------


// routes

// running server
mongoose
    .connect(MONOGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT,() => {
            console.log(`App is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`MongoDB connection error`, err);
    });
