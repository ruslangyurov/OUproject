import mongoose from 'mongoose';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
// import io from '../index.js';
import Bay from '../models/bay.js';

const createBay = asyncHandler(async(req,res) => {
   const {bayNumber, trailerNumber, stockDelivered, fullTrailer,comment, trestleOn} = req.body
   

    const bayObj = {
        bayNumber,
        trailerNumber,
        stockDelivered,
        fullTrailer,
        comment,
        trestleOn
    }


    const newBay = await Bay.create(bayObj)
   .then(() => res.status(201).json({message:"Bay Succesfully created"}))
   .catch(err => res.status(400).json("Error: " + err))
})

const updateBay = asyncHandler(async(data) => {
    const {bayNumber, trailerNumber, stockDelivered, fullTrailer, comment} = data

    if (!fullTrailer || !trailerNumber) {
        return ({status: "400"})
    }
    console.log(trailerNumber)
    

    const update = {
        trailerNumber:trailerNumber.toLowerCase(),
        stockDelivered:stockDelivered === "Stock Delivered"||stockDelivered === ""?"No Information":stockDelivered,
        fullTrailer:fullTrailer,
        comment:comment
    }

    const newBay =  await Bay.findOneAndUpdate({bayNumber:bayNumber}, update, {new:true, runValidators:true}).exec()

    if (!newBay) {
        return ({status: "401"})
    } 
    return {status: "200", bayInfo: newBay, updateTime:newBay.updatedAt}
})

const updateTrestle = asyncHandler(async(data) => {
    const {bayNumber, trestleOn} = data

    const updatedTrestle = await Bay.findOneAndUpdate({bayNumber:bayNumber}, {trestleOn:trestleOn}, {new:true, runValidators:true}).exec()
    return updatedTrestle
})

    


const getAllBays = asyncHandler(async() => {

    const bays = await Bay.find().sort({ bayNumber: 1 }).exec();

    return bays
})

const getEmptyTrailers = asyncHandler(async(req, res) => {

    const bays = await Bay.find({fullTrailer:"Empty"}).exec()
    if (!bays) {
        return res.status(400).json("No bays found")
    
    }
    res.json(bays)
})

const getFullTrailers = asyncHandler(async(req, res) => {

    const bays = await Bay.find({fullTrailer:"Full"}).exec()
    if (!bays) {
        return res.status(400).json("No bays found")
    
    }
    res.json(bays)
})

const getBay = asyncHandler(async(req,res) => {
    const trailerNumber = req.query.trailerNumber.toLowerCase()
    
    const bay = await Bay.findOne({trailerNumber:trailerNumber}).exec()
    
    if (!bay) {
        return res.status(400).json({mesage: "Trailer not found."})
     
    }
    res.json(bay)
   
})






export{createBay, getEmptyTrailers,getBay, updateBay, updateTrestle, getFullTrailers, getAllBays}
