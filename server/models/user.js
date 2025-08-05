import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema( {
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },

    role: {
        type:String, 
        default:"Employee"
    },

    name:String, 
    address:String,
    phoneNumber:String,

    employmentHistory: [
        {
            department:String,
            position:String,
            period:String,
            startDate:Date,
            endDate:Date
        }
    ]

    
})

const User = mongoose.model("User", userSchema)
export default User;