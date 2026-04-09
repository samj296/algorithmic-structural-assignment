const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const fsLogic = require("../backendLogic/fileSystemLogic");
const userController = require("../controllers/userController");

router.get("/signup", userController.getSignUpPage);
router.get("/", userController.login);

// --------------- protected route --------------------------

router.post("login", passport.authenticate("local"), (req, res) => {
    // creating fresh root for the user
    req.session.root = fsLogic.createRoot("root");
    //here I will render the homepage
});

module.exports = router;