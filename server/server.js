require("dotenv").config();
const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const router = require('./routes/route')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   

mongoose.connect(process.env.DBURI).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);
});

  app.use(cors({
    "origin": "*",
    "Access-Control-Allow-Origin":"*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))

app.use('/api',router)



app.listen(process.env.PORT,(req,res)=>{
    console.log("Server is running on ",process.env.PORT)
})