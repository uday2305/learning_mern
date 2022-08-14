const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/router');
const bodyParser = require('body-parser');
const cors=require("cors");
//Connecting to our mongodb shop24x7 database 
mongoose.connect('mongodb://127.0.0.1:27017/testShop',()=>{
    console.log('Database is connected');
});

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

//sending the default route status as 404
app.get("*", function (req, res) {
    res.status(404).send("Error_page");   
});

//running on port 8080
app.listen(8080,()=>{
    console.log('Listening on http://localhost:8080');
});

module.exports = app; // for testing