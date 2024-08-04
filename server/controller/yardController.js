import mongoose from 'mongoose';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import io from '../index.js';
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

const updateBay = asyncHandler(async(req,res) => {
    const {bayNumber, trailerNumber, stockDelivered, fullTrailer, comment} = req.body

    if (!bayNumber||!fullTrailer || !trailerNumber) {
        return res.status(400).json("Please fill out all the required fields")
    }
    
    

    const update = {
        trailerNumber:req.body.trailerNumber,
        stockDelivered:stockDelivered === "Stock Delivered"||stockDelivered === ""?"No Information":stockDelivered,
        fullTrailer:fullTrailer,
        comment:comment
    }

    var newBay = await Bay.findOneAndUpdate({bayNumber:req.body.bayNumber}, update).exec()

    if (!newBay) {
        return res.status(400).json("No bay found")
    }

   


    res.json(newBay.updatedAt)
})

const getBays = asyncHandler(async(req, res) => {

    const bays = await Bay.find({fullTrailer:"Empty"}).exec()
    if (!bays) {
        return res.status(400).json("No bays found")
    
    }
    res.json(bays)
})

const getBay = asyncHandler(async(req,res) => {
    const {trailerNumber} = req.body
    const bay = await Bay.findOne({trailerNumber:trailerNumber}).exec()

    if (!bay) {
        return res.status(400).json({message: "Bay not found"})
    }

    res.json(bay)
   
})






export{createBay, getBays,getBay, updateBay}
