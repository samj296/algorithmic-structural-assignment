const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const fsLogic = require("../backendLogic/fileSystemLogic");
const userController = require("../controllers/userController");

router.get("/signup", userController.getSignUpPage);
router.get("/", userController.getloginPage);
router.post("/logout", userController.logout);
router.post("/signup", userController.createUser);
// --------------- protected route --------------------------
router.post("/login", passport.authenticate("local"), (req, res) => {
    req.session.root = fsLogic.createRoot("root");
    req.session.currentPath = "/";
    res.redirect("/homepage");
});

router.get("/homepage", (req, res) => {
    res.render("terminal",{title: "Mighty Husk"});
});

module.exports = router;