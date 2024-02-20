import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
dotenv.config();
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors());
const mongoDb = "mongodb+srv://ruslangyurov:UPhkK4FkI2nVFUii@oucluster.dqizjw9.mongodb.net/?retryWrites=true&w=majority"
app.get('/',(req,res) => {
    res.send("Welcome to server")
})
const PORT = process.env.PORT || 5000;
mongoose.connect(mongoDb).then(() => console.log(
    `server is runnin on port ${PORT}`
)).catch(err => console.log(err))