const express = require('express');
const router = express.Router();

const controller = require('../Controllers/fileUpload.controller');


router.post('/upload/:location',controller.uploadFile);
router.post('/delete',controller.deleteFile);

module.exports = router;