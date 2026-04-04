const express = require("express");
const router = express.Router();
const fsController = require("../controllers/fileSystemController");

//create folder
router.post("/create", fsController.createFolder);
