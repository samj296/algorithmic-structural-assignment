const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).send("missing details");
    };

    //hasing password

    const passwordHash = await bcrypt.hash(password, 10);

    try{
        await User.create({name, email, passwordHash});
    }catch(err){
        console.log("Signup error", err)
        return res.status(400).send("Unable to signup, check username or password");
    };
};

exports.getSignUpPage = (req, res) => {
    // render signup page here
};

exports.login = (req, res) => {
    // render login page here
    res.render("login")
};

exports.logout = (req, res, next) => {
    req.logout(function(err){
        if(err) return next(err);
        if(req.headers.accept && req.headers.accept.includes("application/json")){
            return res.status(200).json({
                redirect: "/"
            });
        };
        res.redirect("/")
    });
};
