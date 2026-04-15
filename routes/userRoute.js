const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const fsLogic = require("../backendLogic/fileSystemLogic");
const userController = require("../controllers/userController");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");
const User = require("../models/User")

router.get("/signup", userController.getSignUpPage);
router.get("/", userController.getloginPage);
router.post("/logout", userController.logout);
router.post("/signup", userController.createUser);
// --------------- protected route --------------------------
router.post("/login", passport.authenticate("local"), async (req, res) => {
    const user = await User.findById(req.user._id);
    req.session.root = fsLogic.createRoot(user.name);
    req.session.currentPath = "/";
    res.redirect("/homepage");
});

router.get("/homepage", ensureLoggedIn, (req, res) => { 
    res.render("terminal",{
        title: "Mighty Husk",
        root: req.session.root.value
    });
});

module.exports = router;