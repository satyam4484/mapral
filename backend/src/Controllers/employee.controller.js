const {Employee} = require("../Models/employee.model");
const {Contact} =require("../Models/contact.model");
const User = require("../Models/user.model");
const {ResponseFormat} = require("../Services/responseFormat");
const {createContact} = require("../Controllers/contact.controller");
const {generateUniqueId} = require("../Services/services");
const secureRandomPassword = require('secure-random-password');


exports.createEmployee = async (request, response) => {
    try {
        const data = request.body;
        // const deletedContact = await Contact.deleteOne({_id:"64e4f4c93dfa740cfb15b2c6"});
        const contact = await createContact(data.contact);
        const uniqueId = await generateUniqueId("EMP");
        const password = secureRandomPassword.randomPassword({ length: 12 });
        
        const user =  await User.create({
            user_id:uniqueId,
            password:password,
            user_roles:"Employee"
        });

        const newEmployee = await Employee.create({
            contact:"64e4462f54f69b37061c20e3",
            category:data.category,
            user
        });
        // Respond with a success message and the new user's data
        response.status(201).send(ResponseFormat(false, "User created successfully",{user_id:user.user_id,password}));
    } catch (error) {
        // Handle errors by sending an error responsse
        console.log(error);
        response.status(500).send(ResponseFormat(error, "Error while creating the user"));
    }
};
