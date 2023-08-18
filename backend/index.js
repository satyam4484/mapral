const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
require("dotenv").config()
require("./src/DB/connection")


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())


app.use(cors({
    origin: '*'
}));

app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})

module.exports = app;