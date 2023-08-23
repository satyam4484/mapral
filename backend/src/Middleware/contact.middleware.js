const { deleteFileFromFolder } = require("../Services/services");

// Middleware to delete related files when deleting a contact
async function deleteContactCascades(contact, next) {
  try {
    // Delete related file fields
    await deleteFileFromFolder(contact.pancard.pancard_photo);
    await deleteFileFromFolder(contact.aadhar.aadhar_photo);
    await deleteFileFromFolder(contact.pf.pf_photo);
    await deleteFileFromFolder(contact.esic.esic_photo);
    await deleteFileFromFolder(contact.electricity_bill.bill_photo);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during file deletion
    next(error);
  }
}

// Middleware to delete related files when deleting a document
async function deleteDocumentCascades(document, next) {
  try {
    // Delete the file associated with the document
    await deleteFileFromFolder(document.path);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during file deletion
    next(error);
  }
}

// Export the middleware functions
module.exports = {
    deleteContactCascades,
    deleteDocumentCascades
};
