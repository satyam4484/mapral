const express = require('express');
const {ResponseFormat} = require("../Services/responseFormat");
const multer = require('multer');
const fs = require('fs');
const path  = require('path');


express().use('/uploads', express.static('uploads'));

const createStorage = require("../Middleware/storeFile.middleware");

module.exports.uploadFile = (request,response) => {
  try{

    const location = multer({ storage: createStorage(`uploads/${request.params.location}`) });

    location.any()(request,response,(error) => {
        if(error){
            throw "File upload error";
        }
        const filePath = request.files[0].destination +'/'+request.files[0].filename;
        response.status(200).send(ResponseFormat(false,'File uploaded successfully',{filePath}))
    })
  }catch(error) {
    response.status(500).send(ResponseFormat(error,'File upload error'));
  }
}   


// delete file need to be implemented
module.exports.deleteFile = async (request,response)=>{
    try{
        const filepath = path.join(__dirname,request.body.filePath);
        console.log(filepath);

        fs.unlink(filepath,(error) => {
            if(error){
                throw "Error deleting file";
            }
            response.status(200).send(ResponseFormat(false,"File deleted successfully"));
        })
    }catch(error) {
        console.log(error);
        response.status(500).send(ResponseFormat(error,'Error deleting file'));
      }
}