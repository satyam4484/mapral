const express = require("express");
const router = express.Router();
const multer = require('multer');

const createStorage = require("../Middleware/storeFile.middleware");


const companyController = require("../Controllers/company.controller");
const company = multer({ storage: createStorage("uploads/company/") });

// Route for creating a company
router.route('/').post(company.any(), companyController.createCompany);

// Route for deleting a company by ID
// router.delete("/company/:id", companyController.deleteCompany);

module.exports = router;
