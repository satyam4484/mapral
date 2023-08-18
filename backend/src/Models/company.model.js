const { Schema, model } = require("mongoose");


const companySchema = new Schema({
    // this need to be implemented
});


const Company = model("Company",companySchema);


module.exports = {
    Company
}