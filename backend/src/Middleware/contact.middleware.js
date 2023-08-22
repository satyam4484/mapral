// this need to be implemented
const {deleteFileFromFolder} = require("../Services/services");

async function deleteContactCascades (contact,next) {
  // delete related file fields
  await deleteFileFromFolder(contact.pancard.pancard_photo);
  await deleteFileFromFolder(contact.aadhar.aadhar_photo);
  await deleteFileFromFolder(contact.pf.pf_photo);
  await deleteFileFromFolder(contact.esic.esic_photo);
  await deleteFileFromFolder(contact.electricity_bill.bill_photo);
  next();
}

async function deleteDocumentCascades(document,next) {
  await deleteFileFromFolder(document.path);
  next();
}


module.exports = {
    deleteContactCascades,
    deleteDocumentCascades
}
/*
{
  aadhar: {
    aadhar_no: '1234 5678 9012',
    aadhar_photo: 'uploads/employee/aadhar.jpg_22-8-2023-22-31-0.jpg'
  },
  pancard: { pancard_no: 'ABCDE1234F', pancard_photo: 'uploads/employee/pancard.jpg_22-8-2023-22-31-19.jpg' },
  pf: { pf_no: 'PF1234567890', pf_photo: 'uploads/employee/pf.png_22-8-2023-22-38-56.png' },
  esic: { esic_no: 'ESIC9876543', esic_photo: 'uploads/employee/esic.png_22-8-2023-22-40-54.png' },
  electricity_bill: { bill_no: 'EB123456', bill_photo: 'uploads/employee/electricity_bill.png_22-8-2023-22-41-11.png' },
  name: 'John Doe',
  profile_pic: 'uploads/employee/profile.jpg_22-8-2023-22-30-22.jpg',
  contact_no: '123-456-7890',
  date_of_birth: 1990-01-15T00:00:00.000Z,
  current_address: '123 Main St, City',
  permanent_address: '456 Elm St, Town',
  un_no: 'UN123456',
  family_details: [
    new ObjectId("64e4462e54f69b37061c20d3"),
    new ObjectId("64e4462e54f69b37061c20d4")
  ],
  education_details: [
    new ObjectId("64e4462e54f69b37061c20db"),
    new ObjectId("64e4462e54f69b37061c20dc")
  ],
  experience: [
    new ObjectId("64e4462e54f69b37061c20d7"),
    new ObjectId("64e4462e54f69b37061c20d8")
  ],
  other_documents: [
    new ObjectId("64e4462e54f69b37061c20df"),
    new ObjectId("64e4462e54f69b37061c20e0")
  ],
}
*/