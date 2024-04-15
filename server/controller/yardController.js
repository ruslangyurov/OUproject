import mongoose from 'mongoose';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import io from '../index.js';
import Bay from '../models/bay.js';

const createBay = asyncHandler(async(req,res) => {
    const bayNumber = req.body.bayNumber;
    const trailerNumber = req.body.trailerNumber;
    const stockDelivered = req.body.stockDelivered;
    const fullTrailer = req.body.fullTrailer;
    const comment = req.body.comment;
    const trestleOn = req.body.trestleOn;



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

const getBays = asyncHandler(async(req, res) => {

    const bays = await Bay.find({})
    if (!bays) {
        return res.status(400).json("No bays found")
    
    }
    res.json(bays)
})

const getBay = asyncHandler(async(req,res) => {
    const {id,bayNumber, trailerNumber, stockDelivered, fullTrailer, comment,trestleOn} = req.body
    const bay = await Bay.findById(id).exec()

    if (!bay) {
        return res.status(400).json({message: "Bay not found"})
    }

    res.json(bay)
   
})


export{createBay, getBays,getBay}
