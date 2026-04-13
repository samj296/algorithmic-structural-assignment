require ("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./auth/passport");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandling");

// importing routes
const fileSystemRoute = require("./routes/fileSystemRoute");
const userRoute = require("./routes/userRoute");

const PORT = process.env.PORT || 3000;
const MONOGODB_URI = process.env.MONOGODB_URI;

const app = express();

app.use((req, res, next) => {
    next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));

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

app.use("/", userRoute);
app.use("/fs", fileSystemRoute);

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
