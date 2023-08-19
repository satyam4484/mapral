const multer = require('multer');
const path = require("path");

// This function creates Multer disk storage with customized filename
function createStorage(destinationFolder) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destinationFolder); // Set the destination folder for uploaded files
        },
        filename: (req, file, cb) => {
            const currentdate = new Date();
            const datetime = `${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}-${currentdate.getHours()}-${currentdate.getMinutes()}-${currentdate.getSeconds()}`;
            
            const fileFormat = file.originalname.split('.').pop(); // Get the file format (extension)
            const newFilename = `${file.originalname}_${datetime}.${fileFormat}`; // Create a new filename with date and time
            cb(null, newFilename); // Set the new filename for the uploaded file

            // Construct and store the full path of the uploaded file in the request object
            const fullPath = path.join(destinationFolder, newFilename);
            req.resumePath = fullPath;
        }
    });

    return storage; // Return the customized storage configuration
}

module.exports = createStorage;
