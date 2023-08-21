const formDataToObject = require('form-data-json-convert');
const {Employee} = require("../Models/employee.model");
const {Contact} =require("../Models/contact.model");
const {User} = require("../Models/user.model");
const {ResponseFormat} = require("../Services/responseFormat");


exports.createEmployee = async (request, response) => {
    try {
        const data = request.body;
        

        // images 
        // profile_pic,aadhar_photo,pf_photo,esic_photo,bank_proof,bill_photo


        // Respond with a success message and the new user's data
        response.status(201).send(ResponseFormat(false, "User created successfully"));
    } catch (error) {
        // Handle errors by sending an error responsse
        console.log(error);
        response.status(500).send(ResponseFormat(error, "Error while creating the user"));
    }
};
