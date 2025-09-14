import mongoose from 'mongoose';
import Bay from '../models/bay.js';

export const createBays = async (req, res) => {
  const { low, high } = req.body;

  if (high > 200) {
    return res.status(400).json({ message: "Value is too large" });
  }

  for (let i = low; i <= high; i++) {
    const duplicate = await Bay.findOne({ bayNumber: i }).lean().exec();
    if (duplicate) continue;

    const bayObj = {
      bayNumber: i,
      trailerNumber: "Trailer Number",
      stockDelivered: "",
      fullTrailer: false,
      comment: "",
      trestleOn: false,
    };

    try {
      await Bay.create(bayObj);
    } catch (err) {
      console.error(`Failed to create bay ${i}:`, err.message);
      return res.status(400).json({ message: err.message }); // ✅ now correctly logs the error
    }
  }

  return res.status(201).json({ message: "Bays successfully created" });
};


const createBay = async(req,res) => {
    const {bayNumber} = req.body

    if (!bayNumber) {
      return res.status(400).json({message:"Please enter a number!"})
    }

    const num = parseInt(bayNumber)
    if (!Number.isInteger(num) || num > 200) {
    return res.status(400).json({
      message: "Please enter a valid integer between 1 and 200!",
    });
  }

    const duplicate = await Bay.findOne({bayNumber}).lean().exec()
    if (duplicate) {
       return res.status(409).json({message: "Bay already exists."})
    }

    const bayObj = {
        bayNumber,
        trailerNumber:"Trailer Number",
        stockDelivered:"Stock delivered",
        fullTrailer:false,
        comment:"",
        trestleOn:false
    }


    try {
      await Bay.create(bayObj);
      res.status(201).json({ message: "Bay successfully created" });
    } catch (err) {
      res.status(400).json({ message: "Error: " + err.message });
    }

}

const updateBay = async(data) => {
    const {bayNumber, trailerNumber, stockDelivered, fullTrailer, comment} = data.formData
    const user = data.user

    if (!trailerNumber) {
        return ({status: "400"})
    }
    console.log(trailerNumber)
    

    const update = {
        trailerNumber:trailerNumber.toLowerCase(),
        stockDelivered:stockDelivered === "Stock Delivered"||stockDelivered === ""?"No Information":stockDelivered,
        fullTrailer:fullTrailer,
        comment:comment,
        bayUpdatedBy: user,
        bayUpdatedAt: new Date()
    }

    try {
      const newBay =  await Bay.findOneAndUpdate({bayNumber:bayNumber}, update, {new:true, runValidators:true}).exec()

      if (!newBay) {
          return ({status: "401"})
      } 
      return {status: "200", bayInfo:newBay}  
    } catch (err) {
      return { status: "500", message: "Server error" };
  }
}

    


const updateTrestle = async(data) => {
    const {bayNumber, trestleOn, user} = data

    const updatedBayTrestle = await Bay.findOneAndUpdate({bayNumber:bayNumber}, {trestleOn:trestleOn, trestleUpdatedAt: new Date(), trestleUpdatedBy:user}, {new:true, runValidators:true}).exec()
    return updatedBayTrestle
}

const deleteBay = async(data) => {
  const {bayNumber, trailerNumber, user} = data;

  if (!trailerNumber || !bayNumber) {
    return { status: 400, message:`Validation error, trailer number: ${trailerNumber}, bay number: ${bayNumber}` };
  }

  const deletedBay = {
    trailerNumber:"Trailer Number",
    stockDelivered:"",
    fullTrailer:false,
    comment:"",
    bayUpdatedAt: new Date(),
    bayUpdatedBy: user
  }

  try {
    const bayDeleted = await Bay.findOneAndUpdate({ bayNumber },deletedBay,{ new: true, runValidators: true }).exec();

    if (!bayDeleted) {
      return { status: 404 }; // Not found
    }

    return { status: 200, bayInfo:bayDeleted };
  } catch (err) {
    if (err.name === "ValidationError") {
      return { status: 400, message:err.message };
    } else if (err.code === 11000) {
      return { status: 409 };
    } else {
      console.error("Delete error:", err);
      return { status: 500, message:err.message};
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

const getEmptyTrailers = async(req, res) => {

    const bays = await Bay.find({fullTrailer:false}).exec()
    if (!bays) {
        return res.status(400).json("No bays found")
    
    }
    res.json(bays)
}

const getFullTrailers = async(req, res) => {

    const bays = await Bay.find({fullTrailer:true}).exec()
    if (!bays) {
        return res.status(400).json("No bays found")
    
    }
    res.json(bays)
}

const getBay = async(req,res) => {
    const trailerNumber = req.query.trailerNumber.toLowerCase()
    
    const bay = await Bay.findOne({trailerNumber:trailerNumber}).exec()
    
    if (!bay) {
        return res.status(400).json({mesage: "Trailer not found."})
     
    }
    res.json(bay)
   
}






export{createBay, getEmptyTrailers,getBay, updateBay, updateTrestle, getFullTrailers, getAllBays, deleteBay}
