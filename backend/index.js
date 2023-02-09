const mongoose = require("mongoose");
const express = require('express');
const app = require("./app");
const config = require("./config/config");
const cors = require('cors');
let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoose.url,config.mongoose.options).then(()=>{
    console.log("Connected to MongoDB: "+config.mongoose.url);
    app.listen( process.env.PORT || config.port,()=>{
        console.log(`Listening to port ${config.port}`);
    });
}).catch(err=>{
    console.log(err);
});
