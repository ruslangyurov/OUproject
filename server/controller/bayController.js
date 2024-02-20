import mongoose from 'mongoose';
import bay from '../models/bay.js';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import io from '../index.js';

const createBay = asyncHandler(async(req,res) => {
    const bayNUmber = req.body.bayNUmber;
    const trailerNumber = req.body.trailerNumber;
    const stockDelivered = req.body.stockDelivered;
    const fullTrailer = req.body.fullTrailer;
    const comment = req.body.comment;
    const trestleOn = req.body.trestleOn;



    bayObj = {
        bayNumber,
        trailerNumber,
        stockDelivered,
        fullTrailer,
        comment,
        trestleOn
    }


    newBay = await Bay.create(bayObj)
   .then(() => res.statu(201).json({message:"New user added"}))
   .catch(err => res.status(400).json("Error: " + err))
})

