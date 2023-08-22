const { Contact, Documents, Experience, Education, FamilyDetail } = require("../Models/contact.model");
const { ResponseFormat } = require("../Services/responseFormat");

module.exports.createContact = async (data) => {
    let rollbackItems = {};
    try {
        // const familyDetail = await FamilyDetail.create(data.family_details);
        // rollbackItems.familyDetail = familyDetail;
        // const experienceDetails = await Experience.create(data.experience);
        // rollbackItems.experience = experienceDetails;
        // const educationDetails = await Education.create(data.education_details);
        // rollbackItems.education = educationDetails;

        // const otherDocuments = await Documents.create(data.other_documents);
        // rollbackItems.documents = otherDocuments;
        const newdata = data;
        // newdata.family_details =familyDetail.map(item => item._id);
        // newdata.education_details=educationDetails.map(item => item._id);
        // newdata.experience = experienceDetails.map(item => item._id);
        
        // newdata.other_documents = otherDocuments.map(item => item._id);

        const contact = await Contact.create(newdata);
        return contact;

        // response.status(200).send(ResponseFormat(false,'contact created successfully'));

    } catch (error) {
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
        throw error;
    }
}
// if (experienceDetails) {
//     await Experience.findByIdAndDelete(experienceDetails._id);
// }
// if (educationDetails) {
//     await Education.findByIdAndDelete(educationDetails._id);
// }
// if (familyDetail) {
//     await FamilyDetail.findByIdAndDelete(familyDetail._id);
// }
// if (electricityBillDoc) {
//     await Documents.findByIdAndDelete(electricityBillDoc._id);
// }
// if (bankDetailsDoc) {
//     await Documents.findByIdAndDelete(bankDetailsDoc._id);
// }