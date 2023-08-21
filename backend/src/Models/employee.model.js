const { Schema, model } = require("mongoose");

// Define the schema for Employee Categories
const employeeCategorySchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company', // Reference to the 'Company' model
        required: true
    },
    category_name: {
        type: String,
        required: true,
        unique:true
    }
});

// Define the schema for Employees
const employeeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model
        required: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact', // Reference to the 'Contact' model
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'EmployeeCategory', // Reference to the 'EmployeeCategory' model
        required: true
    }
});

// Create models for Employee Category and Employee
const EmployeeCategory = model("EmployeeCategory", employeeCategorySchema);
const Employee = model("Employee", employeeSchema);

// Export the models for use in other parts of your application
module.exports = {
    Employee,
    EmployeeCategory
};
