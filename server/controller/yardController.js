import mongoose from 'mongoose';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
// import io from '../index.js';
import Bay from '../models/bay.js';

export const createBays = asyncHandler(async (req, res) => {
  const { low, high } = req.body;
  if (high > 300) {return res.json({message:"Value is too large"})}  
  for (let i = low; i <= high; i++) {
    const duplicate = await Bay.findOne({ bayNumber: i }).lean().exec();
    if (duplicate) continue;

    const bayObj = {
      bayNumber: i,
      trailerNumber: "",
      stockDelivered: "",
      fullTrailer: "empty",
      comment: "",
      trestleOn: false,
    };

    try {
      await Bay.create(bayObj);
    } catch (err) {
      return res.status(400).json({ message: "Unknown Error. Please try again later!" });
    }
  }

  return res.status(201).json({ message: "Bays successfully created" });
});


const createBay = asyncHandler(async(req,res) => {
    const {bayNumber} = req.body
   
    const duplicate = await Bay.findOne({bayNumber}).lean().exec()
    if (duplicate) {
       return res.status(409).json({message: "Bay already exists."})
    }

    const bayObj = {
        bayNumber,
        trailerNumber:"Trailer number",
        stockDelivered:"Stock delivered",
        fullTrailer:false,
        comment:"",
        trestleOn:false
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

const updateTrestle = async(data) => {
    const {bayNumber, trestleOn} = data

    const updatedTrestle = await Bay.findOneAndUpdate({bayNumber:bayNumber}, {trestleOn:trestleOn}, {new:true, runValidators:true}).exec()
    return updatedTrestle
}

const deleteBay = async(data) => {
  const {bayNumber, trailerNumber} = data;

  if (!trailerNumber || !bayNumber) {
    return { status: 400, message:"Validation error"};
  }

  try {
    const bayDeleted = await Bay.findOneAndUpdate({ bayNumber },{trailerNumber:"Trailer Number", stockDelivered:"", fullTrailer:"", comment:"" },{ new: true, runValidators: true }).exec();

    if (!bayDeleted) {
      return { status: 404 }; // Not found
    }

    return { status: 200, bayNumber: bayDeleted.bayNumber };
  } catch (err) {
    if (err.name === "ValidationError") {
      return { status: 400, message:err.message };
    } else if (err.code === 11000) {
      return { status: 409 };
    } else {
      console.error("Delete error:", err);
      return { status: 500 };
    }
  }
};



const getAllBays = async() => {

    const inbound = await Bay.find({bayNumber:{$lte:40}}).sort({ bayNumber: 1 }).exec();
    const outbound = await Bay.find({bayNumber:{$gte:41}}).sort({ bayNumber: 1 }).exec();
    const parking = await Bay.find({bayNumber:{$gte:101}}).sort({ bayNumber: 1 }).exec();
    const bays = {inbound: inbound, outbound: outbound, parking:parking}
    return  bays
}

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






export{createBay, getEmptyTrailers,getBay, updateBay, updateTrestle, getFullTrailers, getAllBays, deleteBay}
