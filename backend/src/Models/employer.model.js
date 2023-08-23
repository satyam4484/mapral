const { Schema, model } = require("mongoose");
const {Contact} = require("../Models/contact.model");

// Define the schema for Employers
const employerSchema = new Schema({
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
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company', // Reference to the 'Company' model
        required: true
    }
});


employerSchema.pre("deleteOne", { query: true, document: false }, async function (next) {
    const employer = await Employer.findOne({ _id: this.getQuery()._id });
    await Contact.deleteOne({_id:employer.contact});
    next();
})

// Create the Employer model based on the employerSchema
const Employer = model("Employer", employerSchema);

// Export the Employer model for use in other parts of your application
module.exports = Employer;
