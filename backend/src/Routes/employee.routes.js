const express = require("express");
const router = express.Router();
const multer = require('multer');

const createStorage = require("../Middleware/storeFile.middleware");


const controller = require("../Controllers/employee.controller");
const Employee = multer({ storage: createStorage("uploads/employee/") });

router.route('/').post(Employee.any(),controller.createEmployee);
module.exports = router;
