const { Schema, model } = require("mongoose");

// Define the schema for individual documents
const documentSchema = new Schema({
    
    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    }
});

// Define the main contact schema
const contactSchema = new Schema({
    name: {
        type: String,
        trim: true // Trim whitespace from the beginning and end of the name
    },
    contact_no: {
        type: String,
        unique: true,
        required: true // Contact number is required
    },
    date_of_birth: {
        type: Date
    },
    current_address: {
        type: String
    },
    permanent_address: {
        type: String
    },
    aadhar_card_no: {
        type: String
    },
    pan_card_no: {
        type: String
    },
    pf_reg_no: {
        type: String
    },
    un_no: {
        type: String
    },
    esic_no: {
        type: String
    },
    family_details: {
        type: String
    },
    education_details: {
        type: String
    },
    experience: {
        type: String
    },
    bank_account_no: {
        type: String
    },
    bank_details: {
        type: Schema.Types.ObjectId, // Reference to a document in the 'Documents' collection
        ref: 'Documents'
    },
    electricity_bill: {
        type: Schema.Types.ObjectId, // Reference to a document in the 'Documents' collection
        ref: 'Documents'
    },
    other_documents: [
        {
            type: Schema.Types.ObjectId, // Reference to documents in the 'Documents' collection
            ref: 'Documents'
        }
    ]
});

const Documents = model("Document",documentSchema);
const Contact = model("Contact", contactSchema);

module.exports = {Contact,Documents};
