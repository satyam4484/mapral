const { Contact, Documents, Experience, Education, FamilyDetail } = require("../Models/contact.model");
const { ResponseFormat } = require("../Services/responseFormat");

module.exports.createContact = async (data) => {
    let rollbackItems = {}; // Create an object to keep track of items that need to be rolled back in case of an error

    try {
        // Create FamilyDetail instances and store them in rollbackItems
        const familyDetail = await FamilyDetail.create(data.family_details);
        rollbackItems.familyDetail = familyDetail;

        // Create Experience instances and store them in rollbackItems
        const experienceDetails = await Experience.create(data.experience);
        rollbackItems.experience = experienceDetails;

        // Create Education instances and store them in rollbackItems
        const educationDetails = await Education.create(data.education_details);
        rollbackItems.education = educationDetails;

        // Create Documents instances and store them in rollbackItems
        const otherDocuments = await Documents.create(data.other_documents);
        rollbackItems.documents = otherDocuments;

        // Create a new data object with mapped IDs for associations
        const newdata = {
            ...data,
            family_details: familyDetail.map(item => item._id),
            education_details: educationDetails.map(item => item._id),
            experience: experienceDetails.map(item => item._id),
            other_documents: otherDocuments.map(item => item._id)
        };

        // Create a new Contact with the modified data
        const contact = await Contact.create(newdata);
        
        return contact; // Return the created contact

    } catch (error) {
        // If an error occurs, rollback the created instances using the rollbackItems object
        if (rollbackItems.familyDetail) {
            await FamilyDetail.deleteMany({ _id: { $in: rollbackItems.familyDetail.map(detail => detail._id) } });
        }
        if (rollbackItems.experience) {
            await Experience.deleteMany({ _id: { $in: rollbackItems.experience.map(detail => detail._id) } });
        }
        if (rollbackItems.education) {
            await Education.deleteMany({ _id: { $in: rollbackItems.education.map(detail => detail._id) } });
        }
        if (rollbackItems.documents) {
            await Documents.deleteMany({ _id: { $in: rollbackItems.documents.map(detail => detail._id) } });
        }
        
        throw error; // Rethrow the error after rollback

    }
};
