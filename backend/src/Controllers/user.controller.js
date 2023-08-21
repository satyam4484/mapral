const {ResponseFormat}  = require("../Services/responseFormat");

const User = require("../Models/user.model");


module.exports.createUser = async (request, response) => {    
    try {
        // Create a new user instance based on the request body
        const newUser = await User.create(request.body);
        
        // Save the new user instance to the database
        await newUser.save();
        
        // Respond with a success message and the new user's data
        response.status(201).send(ResponseFormat(false,"Account created successfully", newUser));
    } catch (error) {
        // Handle errors by sending an error response
        response.status(500).send(ResponseFormat(error, "Error while creating the user"));
    }
};


module.exports.deleteUser = async (request,response) => {
    try{
        
    }catch(error) {
        // Handle errors by sending an error response
        response.status(500).send(ResponseFormat(error, "Error while deleting the user"));
    }
}
