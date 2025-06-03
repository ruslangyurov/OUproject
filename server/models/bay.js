import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BaySchema = new Schema ({
   _id: String,
    bayNumber: {
        type: Number,
        required:true
    },
    trailerNumber: {
        type:String,
        required:true
    },
    stockDelivered: String,
    fullTrailer: String,
    comment: String,
    trestleOn:Boolean,
    
},{timestamps:true})

const Bay = mongoose.model("Bay",BaySchema)
export default Bay;