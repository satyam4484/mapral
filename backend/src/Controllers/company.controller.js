const Company = require("../Models/company.model");
const { ResponseFormat } = require("../Services/responseFormat");


module.exports.createCompany = async (request, response) => {
    try {
        // Create a new company instance based on the request body
        const newpath = request.files[0].destination +request.files[0].filename;
        

        const newCompany = await Company.create({...request.body,company_logo:newpath});

        // Save the new company instance to the database
        await newCompany.save();

        // Respond with a success message and the new company's data
        response.status(201).send(ResponseFormat(false, "Company created successfully", newCompany));
    } catch (error) {
        // Handle errors by sending an error response
        response.status(500).send(ResponseFormat(error, "Error while creating the company"));
    }
};


