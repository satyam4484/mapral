const express = require("express");
const router = express.Router();


const controller = require("../Controllers/employee.controller");

router.route('/').post(controller.createEmployee);
module.exports = router;
