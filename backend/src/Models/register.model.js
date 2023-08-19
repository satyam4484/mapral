const {model,Schema} = require("mongoose")


const registerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    resume:{
        type:String  // required or not to be asked
    },
    status:{
        type:Number,
        default:-1
    }
});


const Register = model("Register",registerSchema);
module.exports = Register;