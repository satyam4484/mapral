const mongoose = require('mongoose')
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
.then(res => console.log("connected")).catch(error => console.log(error))

module.exports = mongoose;
