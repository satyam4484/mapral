const fs = require('fs');
const path = require('path');
const User = require("../Models/user.model");

// Function to generate a random 5-digit number
const generateRandomDigitNumber = () => {
  return Math.floor(Math.random() * 90000) + 10000;
}

// Function to generate a unique ID based on a given value (e.g., 'EMP' or 'USR')
module.exports.generateUniqueId = async (value) => {
  let isUniqueIdGenerated = false;
  let uniqueId;
  while (!isUniqueIdGenerated) {
    // Generate a unique ID
    uniqueId = 'MMAS-' + value + generateRandomDigitNumber();

    // Check if the generated ID already exists in the database
    const existingUser = await User.findOne({ user_id: uniqueId });

    if (!existingUser) {
      isUniqueIdGenerated = true;
    }
  }
  return uniqueId;
}

// Function to delete a file from a folder
module.exports.deleteFileFromFolder = async (file) => {
  const filePath = path.join(__dirname, '..', '..', file);
  try {
    // Check if the file exists
    const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
    
    if (fileExists) {
      // Delete the file
      await fs.promises.unlink(filePath);
      return true;
    } else {
      // File does not exist
      return false;
    }
  } catch (error) {
    // Error occurred while deleting file
    return false;
  }
}
