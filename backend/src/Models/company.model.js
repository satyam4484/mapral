const { Schema, model } = require("mongoose");


const companySchema = new Schema({
    // this need to be implemented
    company_logo:{
        type:String
    },
    company_name:{
        type:String,
        required:true
    }
});


const Company = model("Company",companySchema);


module.exports = {
    Company
}