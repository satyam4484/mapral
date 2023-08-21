const express = require("express");
const router = express.Router();

const controller = require("../Controllers/user.controller");

router.post("/",controller.createUser);
router.delete("/user/:id",controller.deleteUser);

module.exports=  router;
