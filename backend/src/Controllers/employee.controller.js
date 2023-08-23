const { Employee } = require("../Models/employee.model");
const { Employer } = require("../Models/employer.model");
const { Contact } = require("../Models/contact.model");
const User = require("../Models/user.model");
const { ResponseFormat } = require("../Services/responseFormat");
const { createContact } = require("../Controllers/contact.controller");
const { generateUniqueId } = require("../Services/services");
const secureRandomPassword = require('secure-random-password');

// The main function to create an employee or employer
exports.createEmployee = async (request, response) => {
    let rollbackItems = {}; // A container to track items created in case of rollback
    try {
        const data = request.body;

        // Create a new contact using the createContact function
        const contact = await createContact(data.contact);
        rollbackItems.contact = contact._id; // Store the created contact ID for possible rollback

        // Generate a unique ID and a random password
        const uniqueId = await generateUniqueId("EMP");
        const password = secureRandomPassword.randomPassword({ length: 12 });

        if (data.user_role === "Employee") {
            const user = await User.create({
                user_id: uniqueId,
                password: password,
                user_roles: "Employee"
            });
            // Create an Employee using the contact, category, and user data
            await Employee.create({
                contact: contact._id,
                category: data.category,
                user
            });
            // Send a success response with user_id and password
            response.status(201).send(ResponseFormat(false, "User created successfully", { user_id: user.user_id, password }));
        } else if (data.user_role === "Employer") {
            const user = await User.create({
                user_id: uniqueId,
                password: password,
                user_roles: "Employer"
            });
            // Create an Employer using the contact, company, and user data
            await Employer.create({
                contact: contact._id,
                company: data.company,
                user
            });
            // Send a success response with user_id and password
            response.status(201).send(ResponseFormat(false, "User created successfully", { user_id: user.user_id, password }));
        } else {
            throw "Please Enter a valid User Role";
        }
    } catch (error) {
        if (rollbackItems?.contact) {
            // Rollback: Delete the created contact if an error occurs
            await Contact.deleteOne({ _id: rollbackItems.contact });
        }
        // Handle errors by sending an error response
        console.log(error);
        response.status(500).send(ResponseFormat(error, "Error while creating the user"));
    }
};
