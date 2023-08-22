const { ResponseFormat } = require("../Services/responseFormat");
const { deleteFileFromFolder } = require("../Services/services");
const multer = require('multer');
// const fs = require('fs');
// const path = require('path');



const createStorage = require("../Middleware/storeFile.middleware");

module.exports.uploadFile = (request, response) => {
  try {

    const location = multer({ storage: createStorage(`uploads/${request.params.location}`) });

    location.any()(request, response, (error) => {
      if (error) {
        throw "File upload error";
      }
      const filePath = request.files[0].destination + '/' + request.files[0].filename;
      response.status(200).send(ResponseFormat(false, 'File uploaded successfully', { filePath }))
    })
  } catch (error) {
    response.status(500).send(ResponseFormat(error, 'File upload error'));
  }
}


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
}