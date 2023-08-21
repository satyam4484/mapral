const Register = require("../Models/register.model");
const { ResponseFormat } = require("../Services/responseFormat");

// Register a user with their resume
module.exports.userRegister = async (request, response) => {
    try {
        const newpath = request.files[0].destination +request.files[0].filename;
        const register = await Register.create({
            ...request.body, // User details from request body
            resume: newpath// Attach resume path from the request
        });
        await register.save();
        response.status(201).send(ResponseFormat(false, "User Registered Successfully", register));
    } catch (error) {
        response.status(500).send(ResponseFormat(error, "Error while registering user"));
    }
}

// Set the status of a registered user
module.exports.setRegisterStatus = async (request, response) => {
    try {
        const register = await Register.findOneAndUpdate(
            { _id: request.body.id }, // Find user by ID
            { $set: { status: request.body.status } }, // Update the status field
            { new: true } // Return the updated user
        );
        if (register) {
            response.status(201).send(ResponseFormat(false, "User status updated", register));
        } else {
            throw "Something went wrong"; // Throw an error if user not found
        }
    } catch (error) {
        response.status(500).send(ResponseFormat(error, "Error while updating user status"));
    }
}
