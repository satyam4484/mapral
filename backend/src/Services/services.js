const fs = require('fs');
const path = require('path');
const User = require("../Models/user.model");



const generateRandomDigitNumber = () => {
  return Math.floor(Math.random() * 900000) + 10000;
}


module.exports.generateUniqueId = async (value) => {
  let isUniqueIdGenerated = false;
  let uniqueId;
  while (!isUniqueIdGenerated) {
    // Generate a unique ID (you can replace this with your own logic)
    uniqueId = 'MMAS-' + value + generateRandomDigitNumber();

    // Check if the generated ID already exists in the database
    const existingUser = await User.findOne({ user_id: uniqueId });

    if (!existingUser) {
      isUniqueIdGenerated = true;
    }
  }
  return uniqueId;
}

// modification need to be done
module.exports.deleteFileFromFolder = async (file) => {
  const filePath = path.join(__dirname, '..', '..', file);
  try {
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    if(fileExists){
      await fs.promises.unlink(filePath);
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return false;
  }
}
