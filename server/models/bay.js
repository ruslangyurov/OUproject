import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BaySchema = new Schema ({
    bayNumber: {
        type: String,
        required:true
    },
    trailerNumber: {
        type:String,
        required:true
    },
    stockDelivered: String,
    fullTrailer: String,
    comment: String,
    trestleOn: {
        type:Boolean
    }
},{timestamps:true})

const Bay = mongoose.model("Bay",BaySchema)
export default Bay;