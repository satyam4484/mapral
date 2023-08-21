module.exports.ResponseFormat = (error,message="",data=[]) => {
    if(error) {
        let errorMessage = message;
        if (error.name === "ValidationError") {
            errorMessage = "Validation error. Please provide valid  data.";
        } else if (error.code === 11000) {
            errorMessage = "Duplicate key error. The data already exists.";
        }
        return {error:true,message:errorMessage,data}
    }else{
        return {error,message,data}
    }
};