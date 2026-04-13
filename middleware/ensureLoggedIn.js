module.exports = function ensureLoggedIn(req, res, next){
    if(typeof req.isAuthenticated === "function" && req.isAuthenticated()){
        return next(); //if everything is right move to next process
    };
    // if the client expect the json response
    if(req.headers.accept && req.headers.accept.includes("application/json")){
        return res.status(401).json({
            error: "Session expired",
            redirect: "/"
        });
    };
    // if the request is made from the normal navigation
    res.redirect("/");
};