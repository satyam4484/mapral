const express = require('express');
const router = express.Router();
const controller = require('../Controllers/employeeCategory.controller');

// Create a new employee category
router.post('/', controller.createEmployeeCategory);

// Update an existing employee category
router.patch('/:id', controller.updateEmployeeCategory);

// Delete an employee category
router.delete('/:id', controller.deleteEmployeeCategory);

// Get all employee categories
router.get('/', controller.getEmployeeCategories);

module.exports = router;
