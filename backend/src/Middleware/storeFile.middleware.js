const multer = require('multer');
const path = require('path');
const fs = require('fs');

// This function creates Multer disk storage with a customized filename
function createStorage(destinationFolder) {
    // Middleware to create the upload folder if it doesn't exist
    const createUploadFolderMiddleware = (req, res, next) => {
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }
        next();
    };

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // Call the createUploadFolderMiddleware before setting the destination
            createUploadFolderMiddleware(req, null, () => {
                cb(null, destinationFolder); // Set the destination folder for uploaded files
            });
        },
        filename: (req, file, cb) => {
            const currentdate = new Date();
            const datetime = `${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}-${currentdate.getHours()}-${currentdate.getMinutes()}-${currentdate.getSeconds()}`;
            
            const fileFormat = file.originalname.split('.').pop(); // Get the file format (extension)
            const newFilename = `${file.originalname}_${datetime}.${fileFormat}`; // Create a new filename with date and time
            cb(null, newFilename); // Set the new filename for the uploaded file
        }
    });

    return storage; // Return the customized storage configuration
}

module.exports = createStorage;
