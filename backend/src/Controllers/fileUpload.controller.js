const { ResponseFormat } = require("../Services/responseFormat");
const { deleteFileFromFolder } = require("../Services/services");
const multer = require('multer');

// Import middleware for creating storage and handling file uploads
const createStorage = require("../Middleware/storeFile.middleware");

// Upload a file
module.exports.uploadFile = (request, response) => {
  try {
    // Create storage with a specified location for the uploaded files
    const location = multer({ storage: createStorage(`uploads/${request.params.location}`) });

    // Use multer to handle the file upload
    location.any()(request, response, (error) => {
      if (error) {
        throw "File upload error";
      }
      const filePath = request.files[0].destination + '/' + request.files[0].filename;
      response.status(200).send(ResponseFormat(false, 'File uploaded successfully', { filePath }));
    });
  } catch (error) {
    response.status(500).send(ResponseFormat(error, 'File upload error'));
  }
};

// Delete a file
module.exports.deleteFile = async (request, response) => {
  try {
    const file = await deleteFileFromFolder(request.body.filePath);
    if (file) {
      response.status(200).send(ResponseFormat(false, "File deleted successfully"));
    } else {
      throw "Error deleting file";
    }
  } catch (error) {
    response.status(500).send(ResponseFormat(error, 'Error deleting file'));
  }
};
