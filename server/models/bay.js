import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BaySchema = new Schema ({
    bayNumber: {
        type:Number,
        required:true
    },
    trailerNumber: {
        type:String,
        required:true
    },
    stockDelivered: String,
    fullTrailer: Boolean,
    comment: String,
    tretleOn: {
        type:Boolean,
        required:true
    }
},{timestamps:true})

const Bay = mongoose.model("Bay",BaySchema)
export default Bay;