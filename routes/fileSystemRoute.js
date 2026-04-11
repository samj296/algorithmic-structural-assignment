const express = require("express");
const router = express.Router();
const fsController = require("../controllers/fileSystemController");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

//create folder
router.post("/create", ensureLoggedIn, fsController.createFolder);

//movefolder
router.post("/move", ensureLoggedIn, fsController.moveFolder );

//send the root
router.get("/root", ensureLoggedIn, fsController.getRoot)

module.exports = router;