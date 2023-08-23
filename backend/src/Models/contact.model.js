const { Schema, model } = require("mongoose");
const middleWare = require("../Middleware/contact.middleware");

// Define the schema for individual documents
const documentSchema = new Schema({
    filename: {
        type: String,
        required: true // The filename of the document
    },
    path: {
        type: String,
        required: true // The file path of the document
    }
});


// Define the schema for family details
const familyDetailSchema = new Schema({
    name: {
        type: String,
        required: true // Name of the family member
    },
    relation: {
        type: String,
        required: true // Relationship of the family member
    },
    age: {
        type: Number,
        required: true // Age of the family member
    }
});

// Define the schema for education details
const educationSchema = new Schema({
    college_name: {
        type: String,
        required: true // Name of the college
    },
    course_name: {
        type: String,
        required: true // Name of the course
    },
    percentage: {
        type: String,
        required: true // Percentage achieved
    }
});


// Define the schema for experience details
const experienceSchema = new Schema({
    organization_name: {
        type: String,
        required: true // Name of the organization
    },
    job_title: {
        type: String,
        required: true // Job title
    },
    start_date: {
        type: Date,
        required: true // Start date of the experience
    },
    end_date: {
        type: Date,
        required: true // End date of the experience
    }
});

// Define the main contact schema
const contactSchema = new Schema({
    name: {
        type: String,
        trim: true // Trim whitespace from the beginning and end of the name
    },
    profile_pic: {
        type: String,
    },
    contact_no: {
        type: String,
        unique: true,
        required: true // Contact number is required
    },
    date_of_birth: {
        type: Date,
        required: true // Date of birth of the contact
    },
    current_address: {
        type: String,
        required: true // Current address
    },
    permanent_address: {
        type: String,
        required: true // Permanent address
    },
    aadhar: {
        aadhar_no: String, // Aadhar card number
        aadhar_photo: String // Path to Aadhar card photo
    },
    pancard: {
        pancard_no: String, // PAN card number
        pancard_photo: String // Path to PAN card photo
    },
    pf: {
        pf_no: String, // PF number
        pf_photo: String // Path to PF photo
    },
    un_no: {
        type: String // UN number (if applicable)
    },
    esic: {
        esic_no: String, // ESIC number
        esic_photo: String // Path to ESIC photo
    },

    // Reference arrays to other collections
    family_details: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FamilyDetail' // Reference to FamilyDetail collection
        }
    ],
    education_details: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Education' // Reference to Education collection
        }
    ],
    experience: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Experience' // Reference to Experience collection
        }
    ],

    bank_details: {
        accountHolderName: String,
        accountNumber: String,
        bankName: String,
        branchName: String,
        ifscCode: String,
        bank_proof: String
    },
    electricity_bill: {
        bill_no: String,
        bill_photo: String
    },
    other_documents: [
        {
            type: Schema.Types.ObjectId, // Reference to documents in the 'Documents' collection
            ref: 'Documents'
        }
    ]
});
const Experience = model("Experience", experienceSchema);
const Education = model("Education", educationSchema);
const FamilyDetail = model("FamilyDetail", familyDetailSchema);

documentSchema.pre("deleteOne",{ query: true, document: false },async function(next) {
    const document =await Documents.findOne({ _id: this.getQuery()._id });
    await middleWare.deleteDocumentCascades(document,next);
    next();
});

contactSchema.pre("deleteOne", { query: true, document: false }, async function (next) {
    const contact = await Contact.findOne({ _id: this.getQuery()._id });

    if (contact?.other_documents) {
        for (const item of contact.other_documents) {
            console.log(item);
            await Documents.deleteOne({ _id: item});
        }
    }
    if (contact?.experience) {
        for (const item of contact.experience) {
            console.log(item);
            await Experience.deleteOne({ _id: item});
        }
    }
    if(contact?.education_details){
        for(const item of contact.education_details){
            await Education.deleteOne({_id:item});
        }
    }
    if(contact?.family_details) {
        for(const item of contact.family_details) {
            await FamilyDetail.deleteOne({_id:item});
        }
    }
    await middleWare.deleteContactCascades(contact, next);
    next();
})

const Documents = model("Document", documentSchema);
const Contact = model("Contact", contactSchema);
module.exports = { Contact, Documents, Experience, Education, FamilyDetail };
