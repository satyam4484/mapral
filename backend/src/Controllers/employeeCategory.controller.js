const { EmployeeCategory } = require("../Models/employee.model");
const { ResponseFormat } = require('../Services/responseFormat'); // Update the path accordingly

// Create a new employee category
exports.createEmployeeCategory = async (request, response) => {
    try {
        const newCategory = await EmployeeCategory.create(request.body);
        await newCategory.save();
        response.status(201).send(ResponseFormat(false, 'Employee category created', newCategory));
    } catch (error) {
        response.status(500).send(ResponseFormat(error, 'Error creating employee category'));
    }
};

// Update an existing employee category
exports.updateEmployeeCategory = async (request, response) => {
    try {
        const { id } = request.params;
        const updatedCategory = await EmployeeCategory.findByIdAndUpdate(
            id,
            { ...request.body },
            { new: true } // Return the updated document after update
        );
        if (!updatedCategory) {
            throw 'Employee category not found';
        }
        response.send(ResponseFormat(false, 'Employee category updated', updatedCategory));
    } catch (error) {
        response.status(500).send(ResponseFormat(error, 'Error updating employee category'));
    }
};

// Delete an employee category
exports.deleteEmployeeCategory = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedCategory = await EmployeeCategory.findByIdAndDelete(id);
        if (!deletedCategory) {
            response.send(ResponseFormat(true, 'Employee category not found'));
            return;
        }
        response.send(ResponseFormat(false, 'Employee category deleted'));
    } catch (error) {
        response.status(500).send(ResponseFormat(error, 'Error deleting employee category'));
    }
};

// Get all employee categories
exports.getEmployeeCategories = async (request, response) => {
    try {
        const categories = await EmployeeCategory.find().populate('company');
        response.send(ResponseFormat(false, 'Employee categories retrieved', categories));
    } catch (error) {
        response.status(500).send(ResponseFormat(error, 'Error getting employee categories'));
    }
};
