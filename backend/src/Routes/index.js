const express = require('express');

const userRouter = require('./user.routes');
const registerRouter = require('./register.route');

const router = express.Router();

router.use('/users', userRouter);       // Update the route paths as needed
router.use('/register', registerRouter); // Update the route paths as needed

module.exports = router;
