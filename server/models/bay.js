import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BaySchema = new Schema ({
    bayNumber: {
        type: Number,
        required:true
    },
    trailerNumber: {
        type:String,
        required:true
    },
    stockDelivered: String,
    fullTrailer: { type: Boolean, default: false },
    comment: String,
    trestleOn:Boolean,
    updatedBy: String,
    broken:boolean,
    
},{timestamps:true})

const Bay = mongoose.model("Bay",BaySchema)
export default Bay;