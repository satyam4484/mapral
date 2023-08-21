const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const registerRouter = require('./register.routes');
const companyRouter = require('./company.routes')
const employeeCategoryRouter = require('./employeeCategory.routes');
const employeeRouter = require('./employee.routes');
const fileUploadRouter = require('./fileupload.routes');

router.use('/users', userRouter);       // Update the route paths as needed
router.use('/register', registerRouter); // Update the route paths as needed
router.use('/company',companyRouter);
router.use('/employee-category',employeeCategoryRouter);
router.use('/employee',employeeRouter);
router.use('/file',fileUploadRouter);
module.exports = router;
