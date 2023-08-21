const express = require("express");
const multer = require('multer');
const router = express.Router();

// Import middleware to handle file storage
const createStorage = require("../Middleware/storeFile.middleware");

// Import the controller functions
const controller = require("../Controllers/register.controller");

// Create multer storage for resume files
const resumeStorage = multer({ storage: createStorage("uploads/register/") });

// Define routes and their associated controllers
// POST route to register a user with resume
router.route('/').post(resumeStorage.any(), controller.userRegister);

// POST route to set the status of a registered user
router.route('/status').post(controller.setRegisterStatus);

router.route('/get',controller.getvalue);
module.exports = router;
